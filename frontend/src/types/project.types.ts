export type CreateProjectData = {
  title: string
  publicDescription: string
  privateDescription: string
  tags: string[]
  inPerson: boolean
  location: string
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
