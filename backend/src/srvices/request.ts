import HTTPError from "http-errors"
import { ProjectStatus } from "@prisma/client"
import { prisma, professionalInProject } from "./helper"

/**
 * Return a promise that resolves true if the project has status OPEN,
 * false if not.
 */
const projectIsOpen = async (projectId: string) =>
  (
    await prisma.project.findUnique({
      where: { id: parseInt(projectId, 10) },
      select: { status: true },
    })
  )?.status === ProjectStatus.OPEN

/**
 * Return a promise that resolves true if a request matching the given
 * professional and project already exists, false if not.
 */
const requestExists = async (professionalId: string, projectId: string) =>
  (await prisma.request.findFirst({
    where: {
      professionalId: parseInt(professionalId, 10),
      projectId: parseInt(projectId, 10),
    },
  })) !== null

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
  await prisma.request.delete({
    where: { id: parseInt(requestId, 10) },
  })

  return { success: true }
}

export { requestCreate, requestRespond }
