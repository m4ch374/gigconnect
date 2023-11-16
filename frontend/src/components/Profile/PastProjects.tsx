// Shows the past project that a company user has hosted or a
// professional use has joined
import ProjectPreview from "components/Home/ProjectPreview"
import React, { useCallback } from "react"
import { ListedProjectData } from "types/project.types"

type TPastProjects = {
  projects: ListedProjectData[]
  useStaticLink?: boolean
}

const PastProjects: React.FC<TPastProjects> = ({
  projects,
  useStaticLink = true,
}) => {
  const route = useCallback(
    (id: string) => (useStaticLink ? `/project/${id}` : `details/${id}`),
    [useStaticLink],
  )

  return (
    <div className="border border-zinc-400 rounded-lg">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Past Projects</h1>
        <h3 className="font-thin text-zinc-400">
          Projects completed by this professional in the past
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
                    navRoute={route(p.projectId)}
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
