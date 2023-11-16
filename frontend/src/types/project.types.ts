// Types for projects
export type CreateProjectData = {
  title: string
  publicDescription: string
  privateDescription: string
  tags: string[]
  inPerson: boolean
  location: string
}

export type EditProjectData = {
  projectId: string
  title: string
  publicDescription: string
  privateDescription: string
  tags: string[]
  inPerson: boolean
  location: string
}

export type ProjectRequestData = {
  id: string
  projectId: string
  userId: string
  message: string
  creationDate: string
}

export type ListedProjectData = {
  projectId: string
  title: string
  publicDescription: string
  companyName: string
  companyId: string
  inPerson: boolean
  location?: string
  tags: string[]
  creationDate: string
  status: "open"
}
