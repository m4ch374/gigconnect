import Building from "assets/icons/Building"
import MapPin from "assets/icons/MapPin"
import { AnimatePresence } from "framer-motion"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { TProjectData } from "services/types"
import ApplyProjectModal from "../ApplyProjectModal"

type TProjectMeta = {
  projDetail: TProjectData["responseType"]
  projectId: string
}

const ProjectMeta: React.FC<TProjectMeta> = ({ projDetail, projectId }) => {
  const [applyModal, setApplyModal] = useState(false)

  return (
    <div className="border border-zinc-400 rounded-xl mb-10">
      <div className="p-4">
        <div className="flex my-2 justify-between">
          <h1 className="font-bold text-2xl">{projDetail.title}</h1>
          <button
            className="bg-sky-500 px-4 py-1 rounded-full place-self-start"
            type="button"
            onClick={() => setApplyModal(true)}
          >
            Apply
          </button>
        </div>

        <div className="mt-8 text-zinc-300 flex gap-2 items-center text-sm font-thin">
          <Building className="h-5 w-5" />
          <Link
            to={`/company/${projDetail.companyId}`}
            className="hover:underline"
          >
            {projDetail.companyName}
          </Link>
          <h3>-</h3>
          <h3>
            Posted at: {new Date(projDetail.creationDate).toLocaleDateString()}
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

      <p className="text-zinc-300 font-thin p-4 break-words">
        {projDetail.description}
      </p>

      <hr className="border-zinc-400 my-4" />

      <div className="flex flex-col gap-2">
        <h3 className="px-4">Skills required:</h3>
        <div className="p-4 mx-4 pt-0 flex flex-wrap gap-2">
          {projDetail.tags.map((tag, idx) => (
            <h3
              key={idx}
              className="px-2 py-1 bg-sky-400 rounded-full text-sky-100"
            >
              {tag}
            </h3>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {applyModal && (
          <ApplyProjectModal
            setShowModal={setApplyModal}
            projectId={projectId}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProjectMeta
