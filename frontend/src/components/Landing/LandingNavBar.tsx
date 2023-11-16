import Wifi from "assets/icons/Wifi"
import React from "react"
import { Link, useNavigate } from "react-router-dom"

const LandingNavBar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div
      className="
        w-full
        fixed
        top-0
        left-0
        backdrop-blur-lg
        h-[70px]
        flex
        items-center
        justify-center
        px-8
        z-50
      "
    >
      <div className="flex justify-between w-full max-w-[1000px]">
        <button
          className="flex flex-row items-center gap-4"
          onClick={() => navigate("/")}
        >
          <Wifi />
          <h1 className="font-bold text-4xl">GigConnect</h1>
        </button>

        <Link
          to={"/login"}
          className="text-sky-100 rounded-full px-2 py-1 bg-sky-400 hover:bg-sky-500 place-self-center"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default LandingNavBar
