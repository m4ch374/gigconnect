// Retrieve and set userTypes
// We assume string retrieved from localstorage is of type TUser

import { TUser } from "types/general.types"
import useStorage from "./Storage.hooks"

const TARGET_KEY = "userType"

const useUserType = () => {
  const user = useStorage<TUser>(TARGET_KEY, "unknown")
  return { userType: user.storageItem, setUserType: user.setStorageItem }
}

export default useUserType
