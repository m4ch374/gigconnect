import HTTPError from "http-errors"
import { prisma, professionalInProject } from "./helper"

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

export { projectDataProfessional, projectDataCompany }
