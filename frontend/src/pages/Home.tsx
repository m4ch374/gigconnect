import AnimatedBlob from "assets/AnimatedBlob"
import Companies from "components/Home/Companies"
import HomeSearchBar from "components/Home/HomeSearchBar"
import Projects from "components/Home/Projects"
import React, { useState } from "react"
import { Outlet } from "react-router-dom"

const SELECTED_CLASS = "border-b-2 border-sky-400 font-medium"

const Home: React.FC = () => {
  const [showProjects, setShowProjects] = useState(true)
  const [searches, setSearches] = useState("")

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[800px] w-[90%]">
        <h1 className="text-lg sm:text-2xl font-semibold my-4">
          Find work and live your life!
        </h1>

        <HomeSearchBar searchController={[searches, setSearches]} />

        <div className="w-full border border-zinc-400 rounded-md min-h-[500px] my-4">
          <h1 className="m-4 text-xl">
            Available {showProjects ? "Projects" : "Companies"}
          </h1>

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
                showProjects && SELECTED_CLASS
              }`}
              onClick={() => setShowProjects(true)}
            >
              Projects
            </button>
            <button
              className={`w-full sm:w-auto sm:px-2 py-2 ${
                !showProjects && SELECTED_CLASS
              }`}
              onClick={() => setShowProjects(false)}
            >
              Companies
            </button>
          </div>
          <hr className="border-zinc-400" />

          {showProjects ? <Projects searches={searches} /> : <Companies />}

          <div className="w-full flex flex-col items-center m-2 mb-4">
            <div className="relative">
              <AnimatedBlob />
              <img
                src="/Relax.svg"
                className="w-36 aspect-square absolute top-[30%] left-[25%]"
              />
            </div>
            <h1 className="text-xl font-bold">
              No more {showProjects ? "projects" : "companies"}
            </h1>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default Home
