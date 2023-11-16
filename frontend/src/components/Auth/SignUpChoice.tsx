import React, { Dispatch, SetStateAction, useMemo } from "react"
import { TUser } from "types/general.types"

type TSignUpChoice = {
  userType: TUser
  selectController: [TUser, Dispatch<SetStateAction<TUser>>]
}

const SignUpChoice: React.FC<TSignUpChoice> = ({
  userType,
  selectController,
}) => {
  const [select, setSelected] = selectController

  const selected = useMemo(() => {
    return userType === select
  }, [select, userType])

  const data = useMemo(() => {
    if (userType === "professional") {
      return {
        imgSrc: "/Select_Box.svg",
        heading: "I'm a Professional looking for work.",
      }
    }

    return {
      imgSrc: "/Searching.svg",
      heading: "I'm a Company searching for talent.",
    }
  }, [userType])

  return (
    <div
      className="relative w-full h-auto border border-zinc-400 rounded-md p-4 cursor-pointer"
      onClick={() => setSelected(userType)}
    >
      <img src={data.imgSrc} className="w-20 aspect-auto" />
      <h3 className="text-xl font-semibold">{data.heading}</h3>

      <div
        className={`
          absolute
          flex
          items-center
          justify-center
          top-4
          right-4
          w-5
          aspect-square
          rounded-full
          border
          ${selected ? "border-sky-400" : "border-zinc-400"}
        `}
      >
        {selected && (
          <div className="w-[78%] aspect-square bg-sky-400 rounded-full" />
        )}
      </div>
    </div>
  )
}

export default SignUpChoice
