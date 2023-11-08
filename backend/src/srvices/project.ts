import HTTPError from "http-errors"
import { ProjectStatus } from "@prisma/client"
import {
  prisma,
  professionalInProject,
  checkCompanyIsProjectOwner,
  UserType,
} from "./helper"

/*
  Function creates projects by Company Users
           returns respone 200 with all OPEN project's basic info
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

/*
  Function that updates project details by Company Users
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

  return { newStatus: status.valueOf().toLowerCase() }
}

/*
  Function READS all existing Projects entries from the database
           returns respone 200 with all OPEN project's basic info
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

/*
  Function REMOVES a professional from a project, as requested by the owner Company usert
           returns respone 200 with either success true or false
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
