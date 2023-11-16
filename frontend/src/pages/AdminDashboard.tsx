import Verified from "assets/icons/Verified"
import useUserType from "hooks/UserType.hooks"
import React, { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { Navigate } from "react-router-dom"
import { getAdmin, setVerify } from "services/admin.services"
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
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-xl font-semibold">{userName}</h2>
        {localVerify && <Verified className="w-6 h-6" />}
      </div>

      <button
        className={`w-20 rounded-md font-semibold ${
          localVerify ? "bg-red-400" : "bg-green-600"
        }`}
        onClick={() => {
          ;(async () => {
            const res = await setVerify({
              userId,
              userType: companyName ? "company" : "professional",
              verified: !localVerify,
            })

            if (!res.ok) {
              toast.error(res.error)
              return
            }

            if (res.data.success) setLocalVerify(state => !state)
            toast.success("User verification changed successfully")
          })()
        }}
      >
        {localVerify ? "Unverify" : "Verify"}
      </button>
    </div>
  )
}

const Admin: React.FC = () => {
  const { userType } = useUserType()
  const [companyUsers, setCompanyUsers] = useState<
    TGetAdmin["responseType"]["companyUsers"]
  >([])

  const [professionalUsers, setProfessionalUsers] = useState<
    TGetAdmin["responseType"]["professionalUsers"]
  >([])

  useEffect(() => {
    ;(async () => {
      const res = await getAdmin()

      if (!res.ok) {
        // TODO: Display the error message in res.error on the UI.
        return
      }

      setCompanyUsers(res.data.companyUsers)
      setProfessionalUsers(res.data.professionalUsers)
    })()
  }, [])

  if (userType !== "admin") return <Navigate to={"/"} />

  return (
    <div className="flex justify-center my-10">
      <div className="w-[90%] max-w-[1000px]">
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
    </div>
  )
}

export default Admin
