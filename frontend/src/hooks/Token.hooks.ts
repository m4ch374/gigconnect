// For token lol

import useStorage from "./Storage.hooks"

const useToken = () => {
  const helpers = useStorage("token")

  return { token: helpers.storageItem, setToken: helpers.setStorageItem }
}

export default useToken
