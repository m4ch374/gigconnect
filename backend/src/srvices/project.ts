import HTTPError from "http-errors"
import { ProjectStatus } from "@prisma/client"
import {
  prisma,
  professionalInProject,
  checkCompanyIsProjectOwner,
  UserType,
  getTransporterForEmail,
} from "./helper"

/**
 * Function creates projects by Company Users
 * Throws 400 errors if input data has issues.
 * @returns the new project's id
 */
const projectCreate = async (
  userID: string,
  title: string,
  publicDescription: string,
  privateDescription: string,
  tags: string[],
  inPerson: boolean,
  location: string,
) => {
  // ####################
  // #### TEST CASES ####
  // ####################
  // check the title
  if (title.length === 0) {
    throw HTTPError(400, "Title must not be empty")
  }
  // #######################
  // ####  WRITE TO DB #####
  // #######################
  const project = await prisma.project.create({
    data: {
      companyId: parseInt(userID, 10),
      title,
      publicDescription,
      privateDescription,
      tags,
      inPerson,
      location,
    },
  })
  // #######################
  // #### RETURN DICT ######
  // #######################
  return {
    projectId: project.id.toString(),
  }
}

/**
 * Function that updates project details by Company Users
 * Throws 400 errors if input data has issues.
 * @returns success object with boolean value
 */
const projectUpdate = async (
  projectId: string,
  companyId: string,
  title: string,
  publicDescription: string,
  privateDescription: string,
  tags: string[],
  inPerson: boolean,
  location: string,
) => {
  // #######################
  // ###  TEST CASES    ####
  // #######################
  if (title.length === 0) {
    throw HTTPError(400, "Title must not be empty")
  }
  // #######################
  // ####  WRITE TO DB #####
  // #######################
  // Update rest of the project entry attributes
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
  })
  if (project?.companyId !== parseInt(companyId, 10)) {
    throw HTTPError(400, "Company doesn't own the project")
  }
  await prisma.project.update({
    where: { id: parseInt(projectId, 10) },
    data: {
      title,
      publicDescription,
      privateDescription,
      tags,
      inPerson,
      location,
    },
  })
  // #######################
  // #### RETURN DICT ######
  // #######################
  return {
    success: true,
  }
}

/**
 * Function that retrieves a project's information for the viewing of a professional
 * specific information is returned only if professional is apart of project (e.g. private description)
 * Throws 400 errors if project or professional id doesnt exist.
 * @returns majority of the specific project's information
 */
const projectDataProfessional = async (
  professionalId: string,
  projectId: string,
) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
    include: {
      company: true,
      professionals: true,
    },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  const accepted = await professionalInProject(professionalId, projectId)

  return {
    title: project.title,
    companyId: project.companyId.toString(),
    companyName: project.company.name,
    description: accepted
      ? `${project.publicDescription}\n${project.privateDescription}`
      : project.publicDescription,
    tags: project.tags,
    inPerson: project.inPerson,
    location: project.location,
    creationDate: project.creationDate.toJSON(),
    status: project.status.valueOf().toLowerCase(),
    professionals: accepted
      ? project.professionals.map(p => ({
          userId: p.id.toString(),
          firstName: p.firstName,
          lastName: p.lastName,
          profilePhoto: p.profilePic,
          verified: p.verified,
          description: p.description,
        }))
      : [],
    requests: [],
  }
}

/**
 * Function that retrieves a project's information for the viewing of a company
 * specific information is returned only if the company is the owner of the project (e.g. private description, requests)
 * Throws 400 errors if project or companyId id doesnt exist.
 * @returns ALL or majority of the specific project's information
 */
const projectDataCompany = async (companyId: string, projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
    include: {
      company: true,
      professionals: true,
      requests: true,
    },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  const isOwner = project.companyId === parseInt(companyId, 10)

  return {
    title: project.title,
    companyId: project.companyId.toString(),
    companyName: project.company.name,
    description: isOwner
      ? `${project.publicDescription}\n${project.privateDescription}`
      : project.publicDescription,
    tags: project.tags,
    inPerson: project.inPerson,
    location: project.location,
    creationDate: project.creationDate.toJSON(),
    status: project.status.valueOf().toLowerCase(),
    professionals: isOwner
      ? project.professionals.map(p => ({
          userId: p.id.toString(),
          firstName: p.firstName,
          lastName: p.lastName,
          profilePhoto: p.profilePic,
          verified: p.verified,
          description: p.description,
        }))
      : [],
    requests: project.requests.map(r => ({
      id: r.id.toString(),
      projectId: r.projectId.toString(),
      userId: r.professionalId.toString(),
      message: r.message,
      creationDate: r.creationDate.toJSON(),
    })),
  }
}

/**
 * Admin viewing of full information of a specific project
 * Throws 400 errors if project id doesnt exist.
 * @returns ALL or majority of the specific project's information
 */
const projectDataAdmin = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
    select: { companyId: true },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  return projectDataCompany(project.companyId.toString(), projectId)
}

/**
 * Super function that calls one of the above 3 fncs to retrieve info on a project, dependent on user type
 * @returns ALL or majority of the specific project's information
 */
const projectData = async (
  userId: string,
  userType: UserType,
  projectId: string,
) => {
  switch (userType) {
    case UserType.Admin:
      return projectDataAdmin(projectId)
    case UserType.Company:
      return projectDataCompany(userId, projectId)
    case UserType.Professional:
      return projectDataProfessional(userId, projectId)
    default:
      throw HTTPError(400, "Unsupported user type for getting project data.")
  }
}

/**
 * @returns the current project data for the purposes of editing
 * specialty is that it returns private and public descritptions seperately, since they're usually concatenated
 */
const projectDataEdit = async (companyId: string, projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  if (project.companyId !== parseInt(companyId, 10)) {
    throw HTTPError(403, "Company user does not own this project.")
  }

  return {
    title: project.title,
    publicDescription: project.publicDescription,
    privateDescription: project.privateDescription,
    tags: project.tags,
    inPerson: project.inPerson,
    location: project.location,
  }
}

/**
 * Owner company can change the status of a project, in a one-way fashion (no going back)
 * Additionally emails all associated professionals if project is changed to completed ("CLOSED")
 * Throws 400 errors if project id doesnt exist or company id is not owner of project
 * @returns the new status of the project
 */
const projectChangeStatus = async (companyId: string, projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
    select: { companyId: true, status: true },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  if (project.companyId !== parseInt(companyId, 10)) {
    throw HTTPError(403, "Company user does not own this project.")
  }

  // Perform the state transition based on the current state.
  // (e.g. OPEN --> INPROGRESS or INPROGRESS --> CLOSED)
  let { status } = project
  if (status === ProjectStatus.OPEN) {
    // Delete all pending requests for this project, since it has now started
    await prisma.request.deleteMany({
      where: { projectId: parseInt(projectId, 10) },
    })
    status = ProjectStatus.INPROGRESS
  } else if (status === ProjectStatus.INPROGRESS) {
    status = ProjectStatus.CLOSED
  }

  // If the status has changed, update status in DB
  if (status !== project.status) {
    await prisma.project.update({
      where: { id: parseInt(projectId, 10) },
      data: { status },
    })
  }

  // If status changed to project "CLOSED", then email all profesh's about this change.
  if (status === ProjectStatus.CLOSED) {
    // call helper fnc in a for loop feeding different emails/names each time
    const thisProject = await prisma.project.findUnique({
      where: { id: parseInt(projectId, 10) },
      include: {
        professionals: true,
        company: true,
      },
    })
    const professionals = thisProject?.professionals
    const profeshEmails = professionals?.map(profesh => profesh.email)
    const transporter = getTransporterForEmail()
    if (professionals) {
      // Now Setup the stuff for sending email (we setup envi before emailing each profesh to avoid throttling issues?)
      const header = `Congrats! Your project '${thisProject.title}' has been completed!`
      const body = `Hello there!\n\n${thisProject.company.name} has marked your project, '${thisProject.title}', as completed!\n\nPlease leave a review about your experience working on the project :)\n\nKind regards,\nGigConnect.`
      const mailOptions = {
        from: "acockatoos3900f11@outlook.com",
        to: profeshEmails?.toString(), // send emails as a batch, mitigating concurrency limit issues
        subject: header,
        text: body,
      }
      try {
        await transporter.sendMail(mailOptions)
        console.log(`Batch emails sent successfully, upon project closure`)
      } catch (error) {
        console.error(`ERROR sending to batch emails:`, error)
        // throw error // Rethrow the error to handle it in the calling function
      }
    }
    transporter.close()
  }
  return { newStatus: status.valueOf().toLowerCase() }
}

/**
 * @returns basic public data of every single existing project who's status is OPEN
 * For search/list results
 */
const allProjectPublicData = async () => {
  const queriedInfo = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      publicDescription: true,
      companyId: true,
      company: {
        select: {
          name: true,
        },
      },
      inPerson: true,
      location: true,
      tags: true,
      creationDate: true,
      status: true,
    },
    where: {
      status: ProjectStatus.OPEN,
    },
  })
  // Change key names, access company name, and stringify ids
  const basicInfo = queriedInfo.map(info => ({
    projectId: info.id.toString(),
    title: info.title,
    publicDescription: info.publicDescription,
    companyName: info.company.name,
    companyId: info.companyId.toString(),
    inPerson: info.inPerson,
    location: info.location,
    tags: info.tags,
    creationDate: info.creationDate.toJSON(),
    status: info.status.valueOf().toLowerCase(),
  }))
  return { projects: basicInfo }
}

/**
 * company removes a specific associated professional from the project that the company owns
 * Throws 400 error if company, professional or project id is non existent
 * @returns success object with boolean value
 */
const removeProfessional = async (
  companyId: string,
  professionalId: string,
  projectId: string,
) => {
  // Check if company user is project owner
  const isOwner = await checkCompanyIsProjectOwner(companyId, projectId)
  if (!isOwner) {
    throw HTTPError(400, "Company user is not owner of the project")
  }
  // Check if professional is accepted into project
  const accepted = await professionalInProject(professionalId, projectId)
  if (!accepted) {
    throw HTTPError(400, "Professional is not apart of the project yet")
  }
  // Now remove the relations (profesh <-> proj) via disconnect-record query
  await prisma.project.update({
    where: {
      id: parseInt(projectId, 10),
    },
    data: {
      professionals: {
        disconnect: [{ id: parseInt(professionalId, 10) }],
      },
    },
  })
  return {
    success: true,
  }
}

/**
 * company deletes a specific existing project
 * Throws 400 error if company or project id is non existent
 * @returns success object with boolean value
 */
const projectDelete = async (companyId: string, projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  if (project.companyId !== parseInt(companyId, 10)) {
    throw HTTPError(403, "Company user does not own this project.")
  }

  await prisma.project.delete({
    where: { id: parseInt(projectId, 10) },
  })

  return { success: true }
}

export {
  projectCreate,
  projectUpdate,
  projectDataProfessional,
  projectDataCompany,
  projectDataAdmin,
  projectData,
  projectDataEdit,
  projectChangeStatus,
  allProjectPublicData,
  removeProfessional,
  projectDelete,
}
