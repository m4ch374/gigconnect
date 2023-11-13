import { useMemo } from "react"
import { useLocation } from "react-router-dom"
import useUserType from "./UserType.hooks"

const useIsMyProfile = () => {
  const location = useLocation().pathname
  const { userType } = useUserType()

  const isMyProfile = useMemo(() => {
    const splitted = location.split("/")
    const endingFragment = splitted[splitted.length - 1]

    return endingFragment.toLowerCase() === userType.toLowerCase()
  }, [location, userType])

  return isMyProfile
}

export default useIsMyProfile
