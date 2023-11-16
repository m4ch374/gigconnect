// Takes and decode the jwt token from the local storage
// returns the client's userId
import { useMemo } from "react"
import useToken from "./Token.hooks"

const useUserId = () => {
  const { token } = useToken()

  const userId: string = useMemo(() => {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(c => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(""),
    )

    // nice
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-explicit-any
    return (JSON.parse(jsonPayload) as any).userId as string
  }, [token])

  return userId
}

export default useUserId
