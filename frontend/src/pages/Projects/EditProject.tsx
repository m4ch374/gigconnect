// Edit project page
import EditLocation from "components/Projects/Edit/EditLocation"
import EditPrivateDescription from "components/Projects/Edit/EditPrivateDescription"
import EditPublicDescription from "components/Projects/Edit/EditPublicDescription"
import EditTags from "components/Projects/Edit/EditTags"
import EditTitle from "components/Projects/Edit/EditTitle"
import ProjectDetailsContext from "components/Projects/Edit/ProjectEditContext"
import useObject from "hooks/UseObject.hooks"
import useWindowDimensions from "hooks/WindowDimensions"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import {
  apiEditProject,
  apiGetProjectEditData,
} from "services/project.services"
import { TProjectEditData } from "services/types"

const EditProject: React.FC = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const [error, setError] = useState(false)
  const { height } = useWindowDimensions()

  const projObj = useObject<TProjectEditData["responseType"]>({
    inPerson: false,
    location: "",
    tags: [],
    title: "",
    privateDescription: "",
    publicDescription: "",
  })
  const setProjObj = projObj[3]

  useEffect(() => {
    ;(async () => {
      const resp = await apiGetProjectEditData({
        projectId: projectId as string,
      })

      if (!resp.ok) {
        toast.error(resp.error)
        setError(true)
        return
      }

      setProjObj(resp.data)
    })()
  }, [projectId, setProjObj])

  if (error) return <Navigate to={"/home"} />

  return (
    <ProjectDetailsContext.Provider value={projObj}>
      <div
        className="w-full flex mt-8 flex-col justify-between"
        style={{ minHeight: height - 110 }}
      >
        <div className="w-[90%] max-w-[800px] place-self-center mb-10">
          <h1 className="text-4xl font-semibold">Edit Project</h1>
          <div className="border border-zinc-200/80 rounded-lg mt-4">
            <EditTitle />

            <hr className="border-zinc-200/80" />

            <EditPublicDescription />

            <hr className="border-zinc-200/80" />

            <EditPrivateDescription />

            <hr className="border-zinc-200/80" />

            <EditTags />

            <hr className="border-zinc-200/80" />

            <EditLocation />
          </div>
        </div>
        <div className="h-[80px] w-full bottom-0 left-0 justify-self-end">
          <hr className="border-sky-400 border-2" />
          <div className="w-full flex justify-end items-center h-full px-4 gap-2">
            <Link
              to={`/project/${projectId}`}
              className="border px-4 py-2 border-zinc-400 rounded-full"
            >
              Cancel
            </Link>
            <button
              className="px-4 py-2 bg-sky-400 text-sky-100 rounded-full"
              onClick={() => {
                ;(async () => {
                  const resp = await apiEditProject({
                    ...projObj[0],
                    projectId: projectId as string,
                  })

                  if (!resp.ok) {
                    toast.error(resp.error)
                    return
                  }

                  toast.success("Successfully edited project")
                  navigate(`/project/${projectId}`)
                })()
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </ProjectDetailsContext.Provider>
  )
}

export default EditProject
