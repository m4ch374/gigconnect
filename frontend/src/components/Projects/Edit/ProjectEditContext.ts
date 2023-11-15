import useObject from "hooks/UseObject.hooks"
import { createContext } from "react"
import { TProjectEditData } from "services/types"

const ProjectEditContext = createContext<
  ReturnType<typeof useObject<TProjectEditData["responseType"]>>
>([
  {
    inPerson: false,
    location: "",
    tags: [],
    title: "",
    privateDescription: "",
    publicDescription: "",
  },
  () => {},
  () => {},
  () => {},
])

export default ProjectEditContext
