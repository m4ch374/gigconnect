import StarFilled from "assets/icons/StarFilled"
import StarOutline from "assets/icons/StarOutline"
import MultiLine from "components/MultiLine"
import { useContext, useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { apiUserReviews } from "services/project.services"
import CompanyProfileContext from "./Company/CompanyProfileContext"
import { TUser } from "types/general.types"
import ProfileIcon from "components/ProfileIcon"

type ReviewProps = {
  userId: string
}

type ReviewData = {
  userId: string
  userName: string
  profilePhoto: string
  projectId: string
  projectName: string
  rating: number
  comment: string
}

// Given a userId as props, displays all reviews which that user has received
// eslint-disable-next-line react/prop-types
const ProfileReviews: React.FC<ReviewProps> = ({ userId }) => {
  const [reviews, setReviews] = useState<ReviewData[]>([])
  const companyContext = useContext(CompanyProfileContext)[0]

  // A very cheeky way of detecting the target user type
  const userType: TUser = useMemo(() => {
    if (!companyContext.companyName) return "professional"
    return "company"
  }, [companyContext.companyName])

  const targetUserType: TUser = useMemo(
    () => (userType === "company" ? "professional" : "company"),
    [userType],
  )

  useEffect(() => {
    ;(async () => {
      const res = await apiUserReviews({ userId, userType })
      if (!res.ok) {
        toast.error(res.error)
      }
      setReviews(res.data.reviews)
    })()
  }, [userId, userType])

  return (
    <div className="border border-zinc-200/80 rounded-md">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Reviews</h1>
        <h3 className="font-thin text-zinc-400">Testimonials left by others</h3>
      </div>

      <hr className="border-zinc-200/80" />

      {reviews.length === 0 && (
        <div className="flex flex-col items-center">
          <img src="/Relax.svg" className="w-40 h-40 invert-[0.1]" />
          <h3 className="font-semibold text-xl">No Reviews</h3>
        </div>
      )}

      {reviews.length !== 0 &&
        reviews.map((i, k) => (
          <div key={k}>
            <div className="p-4 hover:bg-sky-400/10 group">
              <div className="flex gap-2 mb-2">
                <ProfileIcon srcUrl={i.profilePhoto} verified={false} />
                <Link
                  to={`/${targetUserType}/${i.userId}`}
                  target="_blank"
                  className="font-semibold text-lg group-hover:text-sky-300 hover:underline"
                >
                  {i.userName}
                </Link>
              </div>
              <div className="flex space-x-1 text-amber-300">
                {i.rating >= 1 ? <StarFilled /> : <StarOutline />}
                {i.rating >= 2 ? <StarFilled /> : <StarOutline />}
                {i.rating >= 3 ? <StarFilled /> : <StarOutline />}
                {i.rating >= 4 ? <StarFilled /> : <StarOutline />}
                {i.rating == 5 ? <StarFilled /> : <StarOutline />}
              </div>
              <div className="mt-4">
                <MultiLine text={i.comment} />
              </div>
            </div>
            {k < reviews.length - 1 && <hr className="border-zinc-200/80" />}
          </div>
        ))}
    </div>
  )
}

export default ProfileReviews
