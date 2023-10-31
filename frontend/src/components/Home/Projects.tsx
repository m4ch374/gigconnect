import React, { useEffect, useState } from "react"
import { getAllPublicProjects } from "services/project.services"
import { ListedProjectData } from "types/project.types"
import ProjectPreview from "./ProjectPreview"

type TProjects = {
  searches: string
}

const Projects: React.FC<TProjects> = ({ searches }) => {
  const [projects, setProjects] = useState<ListedProjectData[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAllPublicProjects()

      if (typeof resp === "undefined") return

      setProjects(resp.projects)
    })()
  }, [])

  return (
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
    </div>
  )
}

export default Projects
