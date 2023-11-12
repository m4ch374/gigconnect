import ProjectPreview from "components/Home/ProjectPreview"
import React from "react"
import { ListedProjectData } from "types/project.types"

type TPastProjects = {
  projects: ListedProjectData[]
}

const PastProjects: React.FC<TPastProjects> = ({ projects }) => {
  return (
    <div className="border border-zinc-400 rounded-lg">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Past Projects</h1>
        <h3 className="font-thin text-zinc-400">
          Past projects involved and participated
        </h3>
      </div>

      <hr className="border-zinc-400/80" />

      <div>
        {projects.length === 0 ? (
          <div className="flex flex-col items-center w-full p-4">
            <img
              src="/Engineering_Team.svg"
              className="w-40 h-40 invert-[0.1]"
            />
            <h3 className="font-semibold text-xl">No Projects</h3>
          </div>
        ) : (
          <>
            {projects.map((p, idx) => {
              return (
                <div key={idx}>
                  <ProjectPreview
                    projectDetail={p}
                    navRoute={`/home/projects/details/${p.projectId}`}
                  />
                  {idx !== projects.length - 1 && (
                    <hr className="border-zinc-400/80" />
                  )}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default PastProjects
