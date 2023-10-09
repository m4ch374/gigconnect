const profCreate = (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {
  console.log(email, password, firstName, lastName)
}

const profData = () => {
  console.log("profData")
}

const profUpdate = (
  firstName: string,
  lastName: string,
  description: string,
  skills: string[],
  externalWebsites: object[],
) => {
  console.log(firstName, lastName, description, skills, externalWebsites)
}

export { profCreate, profData, profUpdate }
