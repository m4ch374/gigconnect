// Context that helps with creating projects
import useObject from "hooks/UseObject.hooks"
import { createContext } from "react"
import { CreateProjectData } from "types/project.types"

const CreateProjectContext = createContext<
  ReturnType<typeof useObject<CreateProjectData>>
>([
  {
    inPerson: false,
    location: "",
    privateDescription: "",
    publicDescription: "",
    tags: [],
    title: "",
  },
  () => {},
  () => {},
  () => {},
])

export default CreateProjectContext
