import AnimatedBlob from "assets/AnimatedBlob"
import HomeSearchBar from "components/Home/HomeSearchBar"
import useStorage from "hooks/Storage.hooks"
import useUserType from "hooks/UserType.hooks"
import SetupProfessional from "components/Home/Onboard/Professional/SetupProfessional"
import React, { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

type ShowItem = "Projects" | "Companies" | "Talents"

const SELECTED_CLASS = "border-b-2 border-sky-400 font-medium"

const Home: React.FC = () => {
  const { userType } = useUserType()
  const navigate = useNavigate()

  const [currItem, setCurrItem] = useState<ShowItem>(
    userType === "professional" ? "Projects" : "Talents",
  )
  const [searches, setSearches] = useState("")

  const onboarded = useStorage("onboarded").storageItem
  const [showSetup, setShowSetup] = useState<boolean>(onboarded === "")

  return (
    <div className="flex flex-col items-center relative">
      <div className="max-w-[800px] w-[90%]">
        <h1 className="text-lg sm:text-2xl font-semibold my-4">
          {userType === "professional"
            ? "Find work and live your life!"
            : "Find the best talents!"}
        </h1>

        <HomeSearchBar searchController={[searches, setSearches]} />

        <div className="w-full border border-zinc-400 rounded-md min-h-[500px] my-4">
          <h1 className="m-4 text-xl">Available {currItem}</h1>

          {userType === "professional" && (
            <div
              className="
                flex
                px-2
                justify-evenly
                gap-2
                -mb-[1px]
                text-lg
                font-thin
                sm:justify-start
                sm:text-sm
              "
            >
              <button
                className={`w-full sm:w-auto sm:px-2 py-2 ${
                  currItem === "Projects" && SELECTED_CLASS
                }`}
                onClick={() => {
                  setCurrItem("Projects")
                  navigate("/home/projects")
                }}
              >
                Projects
              </button>
              <button
                className={`w-full sm:w-auto sm:px-2 py-2 ${
                  currItem === "Companies" && SELECTED_CLASS
                }`}
                onClick={() => {
                  setCurrItem("Companies")
                  navigate("/home/companies")
                }}
              >
                Companies
              </button>
            </div>
          )}
          <hr className="border-zinc-400" />

          <Outlet context={searches} />

          <div className="w-full flex flex-col items-center m-2 mb-4">
            <div className="relative">
              <AnimatedBlob />
              <img
                src="/Relax.svg"
                className="w-36 aspect-square absolute top-[30%] left-[25%]"
              />
            </div>
            <h1 className="text-xl font-bold">
              No more {currItem.toLowerCase()}
            </h1>
          </div>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showSetup && userType === "professional" && (
          <SetupProfessional setShow={setShowSetup} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Home
