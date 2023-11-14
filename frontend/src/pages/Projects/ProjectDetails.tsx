import ProjectMeta from "components/Projects/Details/ProjectMeta"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { apiProjectData } from "services/project.services"
import { TProjectData } from "services/types"

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams()

  const [projDetail, setProjDetail] = useState<TProjectData["responseType"]>()

  useEffect(() => {
    if (!projectId) return
    ;(async () => {
      const res = await apiProjectData({ projectId })

      if (!res.ok) {
        toast.error(res.error)
        return
      }

      setProjDetail(res.data)
    })()
  }, [projectId])

  // Cheese
  if (typeof projDetail === "undefined") return <></>

  return (
    <div className="w-full flex justify-center mt-4">
      <div className="max-w-[1000px] w-full flex flex-col gap-4">
        <ProjectMeta projDetail={projDetail} projectId={projectId as string} />
      </div>
    </div>
  )
}

export default ProjectDetails
