import React, { useEffect, useState } from "react"
import { getAllPublicProjects } from "services/project.services"
import { ListedProjectData } from "types/project.types"
import ProjectPreview from "../../components/Home/ProjectPreview"
import { Outlet } from "react-router-dom"

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ListedProjectData[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAllPublicProjects()

      if (typeof resp === "undefined") return

      setProjects(resp.data.projects)
    })()
  }, [])

  return (
    <>
      <div>
        {projects
          .filter(proj => proj.title.includes(""))
          .map((proj, idx) => {
            return (
              <div key={idx}>
                <ProjectPreview projectDetail={proj} />
                <hr className="border-zinc-400" />
              </div>
            )
          })}
      </div>
      <Outlet />
    </>
  )
}

export default Projects
