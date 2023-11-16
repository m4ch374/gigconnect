// A star button for adding review scores
import StarFilled from "assets/icons/StarFilled"
import StarOutline from "assets/icons/StarOutline"
import React, { Dispatch, SetStateAction } from "react"

type TStarButton = {
  ratingController: [number, Dispatch<SetStateAction<number>>]
  currPos: number
  viewOwnly: boolean
}

const StarButton: React.FC<TStarButton> = ({
  ratingController,
  currPos,
  viewOwnly,
}) => {
  const [rating, setRating] = ratingController

  return (
    <button
      type="button"
      onClick={() => {
        if (!viewOwnly) setRating(currPos)
      }}
    >
      {currPos > rating ? <StarOutline /> : <StarFilled />}
    </button>
  )
}

export default StarButton
