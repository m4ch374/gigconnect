const companyCreate = (
  email: string,
  password: string,
  name: string,
  abn: string,
) => {
  console.log(email, password, name, abn)
}

const companyData = () => {
  console.log("companyData")
}

const companyUpdate = (
  name: string,
  description: string,
  externalWebsites: object[],
) => {
  console.log(name, description, externalWebsites)
}

export { companyCreate, companyData, companyUpdate }
