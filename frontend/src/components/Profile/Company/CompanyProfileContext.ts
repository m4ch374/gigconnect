// A context for company profile data
import useObject from "hooks/UseObject.hooks"
import { createContext } from "react"
import { CompanyProfileData } from "types/company.types"

const CompanyProfileContext = createContext<
  ReturnType<typeof useObject<CompanyProfileData>>
>([
  {
    abn: "",
    companyDescription: "",
    companyName: "",
    externalWebsites: [],
    profilePhoto: "",
    projects: [],
    verified: false,
  },
  () => {},
  () => {},
  () => {},
])

export default CompanyProfileContext
