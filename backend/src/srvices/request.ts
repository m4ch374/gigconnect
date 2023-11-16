import HTTPError from "http-errors"
import { ProjectStatus } from "@prisma/client"
import { prisma, professionalInProject, getTransporterForEmail } from "./helper"

/**
 * @returns a promise that resolves true if the project has status OPEN, false if not.
 */
const projectIsOpen = async (projectId: string) =>
  (
    await prisma.project.findUnique({
      where: { id: parseInt(projectId, 10) },
      select: { status: true },
    })
  )?.status === ProjectStatus.OPEN

/**
 * @returns a promise that resolves true if a request matching the given
 * professional and project already exists, false if not.
 */
const requestExists = async (professionalId: string, projectId: string) =>
  (await prisma.request.findFirst({
    where: {
      professionalId: parseInt(professionalId, 10),
      projectId: parseInt(projectId, 10),
    },
  })) !== null

/**
 * Creates a request, made by a professional to an existing project, with an optional message
 * Throws 400 errors if requests already exists, professional is already in project or project is not Open
 * @returns success object with boolean value
 */
const requestCreate = async (
  professionalId: string,
  projectId: string,
  message: string,
) => {
  if (await professionalInProject(professionalId, projectId)) {
    throw HTTPError(400, "Professional is already in the requested project.")
  }
  if (!(await projectIsOpen(projectId))) {
    throw HTTPError(400, "Requested project is not open for recruitment.")
  }
  if (await requestExists(professionalId, projectId)) {
    throw HTTPError(400, "Professional has already requested this project.")
  }

  try {
    await prisma.request.create({
      data: {
        professionalId: parseInt(professionalId, 10),
        projectId: parseInt(projectId, 10),
        message,
      },
    })
  } catch {
    throw HTTPError(400, "professionalId or projectId does not exist.")
  }

  return { success: true }
}

/**
 * Company either accepts/declines a request, made by a professional to an existing owned project
 * Throws 400 errors if requests doesn't exist, either one of three id's doesn't exist, or company id
 *  is not project owner's.
 * Additionally the specific professional is emailed with the request repsonse.
 * @returns success object with boolean value
 */
const requestRespond = async (
  companyId: string,
  requestId: string,
  accepted: boolean,
) => {
  const request = await prisma.request.findUnique({
    where: { id: parseInt(requestId, 10) },
    select: {
      professionalId: true,
      projectId: true,
      project: {
        select: {
          companyId: true,
        },
      },
    },
  })
  if (request === null) {
    throw HTTPError(400, "requestId does not exist.")
  }
  if (request.project.companyId !== parseInt(companyId, 10)) {
    throw HTTPError(400, "Responding company does not own this project.")
  }

  if (accepted) {
    try {
      await prisma.project.update({
        where: { id: request.projectId },
        data: {
          professionals: {
            connect: { id: request.professionalId },
          },
        },
      })
    } catch {
      throw HTTPError(400, "professionalId or projectId does not exist.")
    }
  }

  // Email the professional about the status of the Request
  const info = await prisma.request.findUnique({
    where: { id: parseInt(requestId, 10) },
    select: {
      professional: {
        select: {
          firstName: true,
          email: true,
        },
      },
      project: {
        select: {
          title: true,
          company: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
  // now finally delete the request itself
  await prisma.request.delete({
    where: { id: parseInt(requestId, 10) },
  })
  // now set up for emailing
  const projectTitle = info?.project.title
  const profeshName = info?.professional.firstName
  const profeshEmail = info?.professional.email
  const companyName = info?.project.company.name
  const header = accepted
    ? `Project request for ${projectTitle} is accepted!`
    : `Project request for ${projectTitle} is declined`
  const body = accepted
    ? `Hi ${profeshName}!\n\nCongrats, your request to join the project, '${projectTitle}', has been accepted by ${companyName}!\n\nGet to it and make your mark!\n\nKind regards,\nGigConnect.`
    : `Hi ${profeshName},\n\nUnfortunately, your request to join the project, '${projectTitle}', has been declined by ${companyName}.\n\nBut don't let that stop you from making your mark, keep at it!\n\nKind regards,\nGigConnect.`
  const mailOptions = {
    from: "acockatoos3900f11@outlook.com",
    to: profeshEmail,
    subject: header,
    text: body,
  }
  const transporter = getTransporterForEmail()
  transporter
    .sendMail(mailOptions)
    .then(() =>
      console.log(`Email to ${profeshEmail} about Requests, sent successfully`),
    )
    .catch(err =>
      console.error(
        `ERROR sending to email ${profeshEmail} about Requests:`,
        err,
      ),
    )
    .finally(() => transporter.close())
  return { success: true }
}

/**
 * @returns all information on the request data, to company owner
 * Throws 400 error if request id doesnt exist
 * Throws 403 error if company user doesn't own the project associated with this request
 */
const requestData = async (companyId: string, requestId: string) => {
  const request = await prisma.request.findUnique({
    where: { id: parseInt(requestId, 10) },
    include: { professional: true, project: true },
  })
  if (request === null) {
    throw HTTPError(400, "requestId does not exist.")
  }
  if (request.project.companyId !== parseInt(companyId, 10)) {
    throw HTTPError(403, "Company user does not own project for this request.")
  }

  return {
    requestId,
    projectId: request.projectId.toString(),
    projectName: request.project.title,
    userId: request.professionalId.toString(),
    firstname: request.professional.firstName,
    lastName: request.professional.lastName,
    profilePhoto: request.professional.profilePic,
    message: request.message,
    creationDate: request.creationDate.toJSON(),
  }
}

export { requestCreate, requestRespond, requestData }
