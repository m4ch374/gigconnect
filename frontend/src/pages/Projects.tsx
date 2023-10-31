import AnimatedBlob from "assets/AnimatedBlob"
import ProjectPreview from "components/Projects/ProjectPreview"
import ProjectSearchBar from "components/Projects/ProjectSearchBar"
import React, { useEffect, useState } from "react"
import { getAllPublicProjects } from "services/project.services"
import { ListedProjectData } from "types/project.types"

const Projects: React.FC = () => {
  const [searches, setSearches] = useState("")
  const [projects, setProjects] = useState<ListedProjectData[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAllPublicProjects()

      if (typeof resp === "undefined") return

      setProjects(resp.projects)
    })()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[800px] w-[90%]">
        <h1 className="text-lg sm:text-2xl font-semibold my-4">
          Find your favourite projects!
        </h1>

        <ProjectSearchBar searchController={[searches, setSearches]} />

        <div className="w-full border border-zinc-400 rounded-md min-h-[500px] my-4">
          <h1 className="m-4 text-xl">Available Projects</h1>
          <hr className="border-zinc-400" />

          <div>
            {projects
              .filter(proj => proj.title.includes(searches))
              .map((proj, idx) => {
                return (
                  <div key={idx}>
                    <ProjectPreview projectDetail={proj} />
                    <hr className="border-zinc-400" />
                  </div>
                )
              })}
            <div className="w-full flex flex-col items-center m-2">
              <div className="relative">
                <AnimatedBlob />
                <img
                  src="Relax.svg"
                  className="w-36 aspect-square absolute top-[30%] left-[25%]"
                />
              </div>
              <h1 className="text-xl font-bold">No more projects</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
