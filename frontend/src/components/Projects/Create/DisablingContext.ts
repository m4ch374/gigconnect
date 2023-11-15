import { Dispatch, SetStateAction, createContext } from "react"

const DisablingContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}])

export default DisablingContext
