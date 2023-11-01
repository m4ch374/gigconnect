import Building from "assets/icons/Building"
import CheveronLeft from "assets/icons/CheveronLeft"
import Clipboard from "assets/icons/Clipboard"
import MapPin from "assets/icons/MapPin"
import useDisableScroll from "hooks/DisableScroll"
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProjectDetailsProfessional } from "services/project.services"
import { TProjDetailsProfessional } from "services/types"

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  useDisableScroll()

  const [projDetail, setProjDetail] =
    useState<TProjDetailsProfessional["responseType"]>()

  useEffect(() => {
    if (!projectId) return
    ;(async () => {
      const resp = await getProjectDetailsProfessional({ projectId })

      if (typeof resp === "undefined") return

      console.log(resp)
      setProjDetail(resp)
    })()
  }, [projectId])

  // Cheating a lil bit
  if (typeof projDetail === "undefined") return <></>

  return (
    <div
      className="fixed top-0 left-0 flex justify-end backdrop-blur-sm w-screen h-screen z-[1000] cursor-pointer"
      onClick={() => navigate(-1)}
    >
      <div
        className="h-full bg-stone-700 w-[100%] max-w-[600px] cursor-default rounded-l-2xl pt-10 px-6 overflow-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <button
            className="flex items-center justify-center p-1.5 rounded-full hover:bg-stone-600"
            onClick={() => navigate(-1)}
          >
            <CheveronLeft />
          </button>

          <Link
            to="/home"
            target="_blank"
            className="font-thin flex gap-1 items-center"
          >
            <h1>Open on other page</h1>
            <Clipboard className="w-5 h-5" />
          </Link>
        </div>

        <div className="border border-zinc-400 rounded-xl min-h-[80%] mb-10">
          <div className="p-4">
            <div className="flex my-2 justify-between">
              <h1 className="font-bold text-2xl truncate">
                {projDetail.title}
              </h1>
              <Link
                className="bg-sky-500 px-4 py-1 rounded-full"
                to={`project-request/${projectId}`}
              >
                Apply
              </Link>
            </div>

            <div className="mt-8 text-zinc-300 flex gap-2 items-center text-sm font-thin">
              <Building className="h-5 w-5" />
              <h3>{projDetail.companyName}</h3>
              <h3>-</h3>
              <h3>
                Posted at:{" "}
                {new Date(projDetail.creationDate).toLocaleDateString()}
              </h3>
            </div>

            <div className="text-zinc-300 flex gap-2 mt-2 items-center text-sm font-thin">
              <MapPin className="h-5 w-5" />
              <h3>{projDetail.location || "N/A"}</h3>
              <h3>-</h3>
              <h3>{projDetail.inPerson ? "In-Person" : "Remote"}</h3>
            </div>
          </div>

          <hr className="border-zinc-400 my-4" />

          <p className="text-zinc-300 font-thin p-4">
            {projDetail.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetails
