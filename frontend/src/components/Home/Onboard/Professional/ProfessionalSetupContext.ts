import useObject from "hooks/UseObject.hooks"
import { createContext } from "react"
import { ProfessionalProfileData } from "types/professional.types"

const ProfessionalSetupContext = createContext<
  ReturnType<typeof useObject<ProfessionalProfileData>>
>([
  {
    description: "",
    externalWebsites: [],
    firstName: "",
    lastName: "",
    profilePhoto: "",
    projects: [],
    qualifications: [],
    skills: [],
    verified: false,
  },
  () => {},
  () => {},
])

export default ProfessionalSetupContext
