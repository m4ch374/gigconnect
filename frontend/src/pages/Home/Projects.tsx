import React, { useEffect, useState } from "react"
import { getAllPublicProjects } from "services/project.services"
import { ListedProjectData } from "types/project.types"
import ProjectPreview from "../../components/Home/ProjectPreview"
import { Outlet, useOutletContext } from "react-router-dom"

const Projects: React.FC = () => {
  const searches = useOutletContext()
  const [projects, setProjects] = useState<ListedProjectData[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAllPublicProjects()

      if (!resp.ok) return

      setProjects(resp.data.projects)
    })()
  }, [])

  return (
    <>
      <div>
        {projects
          .filter(proj =>
            proj.title
              .toLowerCase()
              .includes((searches as string).toLowerCase()),
          )
          .map((proj, idx) => {
            return (
              <div key={idx}>
                <ProjectPreview
                  projectDetail={proj}
                  navRoute={`/home/projects/details/${proj.projectId}`}
                />
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
