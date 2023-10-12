import React, { useEffect, useMemo, useState } from "react"
import { getAdmin, setVerify } from "services/admin"
import { TGetAdmin } from "services/types"

// Put this in here to prevent merge conflict issue
// Seperating them out later
type TUserVerifyItem = {
  verified: boolean
  userId: string
  firstName?: string
  lastName?: string
  companyName?: string
}

const UserVerfifyItem: React.FC<TUserVerifyItem> = ({
  verified,
  userId,
  firstName,
  lastName,
  companyName,
}) => {
  const [localVerify, setLocalVerify] = useState(verified)

  const userName = useMemo(() => {
    return companyName || `${firstName} ${lastName}`
  }, [companyName, firstName, lastName])

  return (
    <div
      className="
        p-4
        rounded-md
        hover:bg-white/20
        transition-colors
        duration-200
        flex
        flex-row
        justify-between"
    >
      <div className="flex flex-row items-center gap-4">
        <div className="bg-white aspect-square w-10 rounded-full" />
        <h2 className="text-xl font-semibold">{userName}</h2>
      </div>

      <button
        className={`w-20 rounded-md font-semibold ${
          localVerify ? "bg-red-400" : "bg-green-600"
        }`}
        onClick={() => {
          ;(async () => {
            const resp = await setVerify({
              userId,
              userType: companyName ? "company" : "professional",
              verified: !localVerify,
            })

            if (typeof resp === "undefined") return

            if (resp.success) setLocalVerify(state => !state)
          })()
        }}
      >
        {localVerify ? "Unverify" : "Verify"}
      </button>
    </div>
  )
}

const Admin: React.FC = () => {
  const [companyUsers, setCompanyUsers] = useState<
    TGetAdmin["responseType"]["companyUsers"]
  >([])

  const [professionalUsers, setProfessionalUsers] = useState<
    TGetAdmin["responseType"]["professionalUsers"]
  >([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAdmin()

      if (typeof resp === "undefined") return

      setCompanyUsers(resp.companyUsers)
      setProfessionalUsers(resp.professionalUsers)
    })()
  }, [])

  return (
    <div className="m-12">
      <h1 className="text-4xl">Admin</h1>

      <hr className="my-2 border-gray-400/80" />

      {companyUsers.map(u => (
        <UserVerfifyItem
          key={u.userId}
          userId={u.userId}
          verified={u.verified}
          companyName={u.companyName}
        />
      ))}

      {professionalUsers.map(u => (
        <UserVerfifyItem
          key={u.userId}
          userId={u.userId}
          verified={u.verified}
          firstName={u.firstName}
          lastName={u.lastName}
        />
      ))}
    </div>
  )
}

export default Admin
