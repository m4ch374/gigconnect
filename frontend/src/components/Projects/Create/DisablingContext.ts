// Used to indicate weather a button is disabled
// usually used for the continue button on create projects
import { Dispatch, SetStateAction, createContext } from "react"

const DisablingContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}])

export default DisablingContext
