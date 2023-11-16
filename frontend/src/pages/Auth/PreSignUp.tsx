import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SignUpChoice from "../../components/Auth/SignUpChoice"
import { TUser } from "types/general.types"
import toast from "react-hot-toast"

const PreSignUp: React.FC = () => {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<TUser>("unknown")

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="
          flex
          flex-col
          items-center
          justify-between
          w-full
          mx-4
          py-4
          max-w-[600px]
          bg-stone-700
          shadow-lg
          drop-shadow-glow-blue
          rounded-md
        "
      >
        <div>
          <h1 className="mt-4 text-lg font-bold text-center sm:text-xl">
            Join as a Professional or Company
          </h1>

          <div className="flex flex-col w-full gap-4 px-4 py-8 sm:flex-row sm:px-12">
            <SignUpChoice
              userType="professional"
              selectController={[selected, setSelected]}
            />
            <SignUpChoice
              userType="company"
              selectController={[selected, setSelected]}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:w-full sm:px-12">
          <button
            className="w-full bg-sky-500 px-2 py-1 rounded-full text-center"
            onClick={() => {
              if (selected !== "company" && selected !== "professional") {
                toast.error("Please choose one of the categories")
                return
              }

              navigate(`/sign-up/${selected}`)
            }}
          >
            Create Account
          </button>

          <h3 className="font-thin">
            Already have an account?{" "}
            <Link to={"/login"} className="text-sky-400 font-normal">
              Log In
            </Link>
          </h3>
        </div>
      </div>
    </div>
  )
}

export default PreSignUp
