import StarFilled from "assets/icons/StarFilled"
import StarOutline from "assets/icons/StarOutline"
import useUserType from "hooks/UserType.hooks"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { apiUserReviews } from "services/project.services"

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
  const { userType } = useUserType()
  const [reviews, setReviews] = useState<ReviewData[]>([])
  useEffect(() => {
    ;(async () => {
      const res = await apiUserReviews({ userId, userType })
      if (!res.ok) {
        toast.error(res.error)
      }
      setReviews(res.data.reviews)
    })()
  })

  return (
    <>
      <h1 className="text-2xl font-semibold">Reviews</h1>
      {reviews.map((i, k) => (
        <div key={k} className=" border-b-2 border-b-zinc-200">
          <div className="flex space-x-1">
            {i.rating >= 1 ? <StarFilled /> : <StarOutline />}
            {i.rating >= 2 ? <StarFilled /> : <StarOutline />}
            {i.rating >= 3 ? <StarFilled /> : <StarOutline />}
            {i.rating >= 4 ? <StarFilled /> : <StarOutline />}
            {i.rating == 5 ? <StarFilled /> : <StarOutline />}
          </div>
          <p>{i.comment}</p>
          <p>
            Reviewed by
            {userType === "company" ? (
              <Link
                to={`/professional/${i.userId}`}
                className="text-sky-500 underline"
              >
                {i.userName}
              </Link>
            ) : (
              <Link
                to={`/company/${i.userId}`}
                className="text-sky-500 underline"
              >
                {i.userName}
              </Link>
            )}
          </p>
        </div>
      ))}
    </>
  )
}

export default ProfileReviews
