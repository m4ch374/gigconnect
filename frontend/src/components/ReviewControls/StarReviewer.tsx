import React, { Dispatch, SetStateAction } from "react"
import { twMerge } from "tailwind-merge"
import StarButton from "./StarButton"

type TStarReviewer = {
  maxRating: number
  ratingController: [number, Dispatch<SetStateAction<number>>]
  className?: string
  viewOnly?: boolean
}

const StarReviewer: React.FC<TStarReviewer> = ({
  maxRating,
  ratingController,
  className = "",
  viewOnly = false,
}) => {
  return (
    <div className={twMerge("flex gap-2 text-amber-300", className)}>
      {[...Array(maxRating).keys()]
        .map(x => x + 1)
        .map(pos => (
          <StarButton
            ratingController={ratingController}
            currPos={pos}
            key={pos}
            viewOwnly={viewOnly}
          />
        ))}
    </div>
  )
}

export default StarReviewer
