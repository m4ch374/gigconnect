import HTTPError from "http-errors"
import { ProjectStatus } from "@prisma/client"
import { prisma, professionalInProject } from "./helper"

// Project create function
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
          verified: p.verified,
        }))
      : [],
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
          verified: p.verified,
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

const projectChangeStatus = async (companyId: string, projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(projectId, 10) },
    select: { companyId: true, status: true },
  })
  if (project === null) {
    throw HTTPError(400, "projectId does not exist.")
  }
  if (project.companyId !== parseInt(companyId, 10)) {
    throw HTTPError(400, "Company user does not own this project.")
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

export {
  projectCreate,
  projectDataProfessional,
  projectDataCompany,
  projectChangeStatus,
}
