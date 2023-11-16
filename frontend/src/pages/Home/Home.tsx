import AnimatedBlob from "assets/AnimatedBlob"
import HomeSearchBar from "components/Home/HomeSearchBar"
import useUserType from "hooks/UserType.hooks"
import SetupProfessional from "components/Home/Onboard/Professional/SetupProfessional"
import React, { useEffect, useMemo, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import SetupCompany from "components/Home/Onboard/Company/SetupCompany"
import { getOnboarded } from "services/auth.services"

type ShowItem = "projects" | "companies" | "talents"

const SELECTED_CLASS = "border-b-2 border-sky-400 font-medium"

const Home: React.FC = () => {
  const location = useLocation()
  const focusedItem: ShowItem = useMemo(() => {
    const splitted = location.pathname.split("/")
    const curr = splitted[2]

    if (typeof curr === "undefined") return "projects"
    return curr as ShowItem
  }, [location.pathname])

  const { userType } = useUserType()
  const navigate = useNavigate()

  const [currItem, setCurrItem] = useState<ShowItem>(focusedItem)
  const [searches, setSearches] = useState("")

  const [showSetup, setShowSetup] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      const resp = await getOnboarded()

      if (!resp.ok) return

      // setShowSetup(!resp.data.onboarded)
      setShowSetup(true)
    })()
  }, [])

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
                currItem === "projects" && SELECTED_CLASS
              }`}
              onClick={() => {
                setCurrItem("projects")
                navigate("/home/projects")
              }}
            >
              Projects
            </button>
            <button
              className={`w-full sm:w-auto sm:px-2 py-2 ${
                currItem === "companies" && SELECTED_CLASS
              }`}
              onClick={() => {
                setCurrItem("companies")
                navigate("/home/companies")
              }}
            >
              Companies
            </button>
            <button
              className={`w-full sm:w-auto sm:px-2 py-2 ${
                currItem === "talents" && SELECTED_CLASS
              }`}
              onClick={() => {
                setCurrItem("talents")
                navigate("/home/talents")
              }}
            >
              Talents
            </button>
          </div>
          <hr className="border-zinc-400" />

          <Outlet context={searches} />

          <div className="w-full flex flex-col items-center m-2 mb-4">
            <div className="relative">
              <AnimatedBlob />
              <img
                src="/Relax.svg"
                className="w-36 aspect-square absolute top-[30%] left-[25%] z-10"
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
        {showSetup &&
          userType !== "admin" &&
          (userType === "professional" ? (
            <SetupProfessional setShow={setShowSetup} />
          ) : (
            <SetupCompany setShow={setShowSetup} />
          ))}
      </AnimatePresence>
    </div>
  )
}

export default Home
