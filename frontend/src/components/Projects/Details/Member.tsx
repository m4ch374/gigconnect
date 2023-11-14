import ProfileIcon from "components/ProfileIcon"
import React from "react"
import { Link } from "react-router-dom"
import { ProfessionalUser } from "types/professional.types"

type TMembers = {
  member: ProfessionalUser
}

const Member: React.FC<TMembers> = ({ member }) => {
  const { profilePhoto, verified, firstName, lastName, userId } = member

  return (
    <div className="w-full hover:bg-sky-400/10 p-2 rounded-md flex justify-between">
      <div className="flex gap-2 items-center">
        <ProfileIcon srcUrl={profilePhoto} verified={verified} />
        <Link
          to={`/professional/${userId}`}
          target="_blank"
          className="font-semibold text-lg hover:underline"
        >
          {firstName + " " + lastName}
        </Link>
      </div>
    </div>
  )
}

export default Member
