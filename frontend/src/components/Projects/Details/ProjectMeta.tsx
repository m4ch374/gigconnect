// Provides information of a project such as title, description etc..
import Building from "assets/icons/Building"
import MapPin from "assets/icons/MapPin"
import React, { Dispatch, SetStateAction } from "react"
import { Link } from "react-router-dom"
import { TProjectData } from "services/types"
import ApplyButton from "./ApplyButton"
import useUserType from "hooks/UserType.hooks"
import RemoveButton from "./RemoveButton"
import useUserId from "hooks/UseUserId.hoosk"
import ChangeStatusButton from "./ChangeStatusButton"
import ShowProjectStats from "./ShowProjectStatus"
import { ProjectStatus } from "types/general.types"
import Pencil from "assets/icons/Pencil"
import MultiLine from "components/MultiLine"

type TProjectMeta = {
  projDetail: TProjectData["responseType"]
  projectId: string
  currStatus: ProjectStatus
  setCurrStatus: Dispatch<SetStateAction<ProjectStatus>>
}

const ProjectMeta: React.FC<TProjectMeta> = ({
  projDetail,
  projectId,
  currStatus,
  setCurrStatus,
}) => {
  const { userType } = useUserType()

  const userId = useUserId()

  return (
    <div className="border border-zinc-400 rounded-xl mb-10">
      <div className="p-4">
        <div className="flex my-2 justify-between">
          <div>
            <ShowProjectStats status={currStatus} />
            <h1 className="font-bold text-2xl">{projDetail.title}</h1>
          </div>
          <div>
            {userType === "professional" && currStatus === "open" && (
              <ApplyButton projectId={projectId} />
            )}
            {userType === "company" && userId === projDetail.companyId && (
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <Link
                  className="p-1 border text-sky-400 border-sky-400 rounded-lg hover:bg-sky-400/20"
                  to={`/project/${projectId}/edit`}
                >
                  <Pencil />
                </Link>
                <RemoveButton projectId={projectId} />
              </div>
            )}
          </div>
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
            Posted on: {new Date(projDetail.creationDate).toLocaleDateString()}
          </h3>
        </div>

        <div className="text-zinc-300 flex gap-2 mt-2 items-center text-sm font-thin">
          <MapPin className="h-5 w-5" />
          <h3>{projDetail.location || "N/A"}</h3>
          <h3>-</h3>
          <h3>{projDetail.inPerson ? "In-Person" : "Remote"}</h3>
        </div>
      </div>

      {userId === projDetail.companyId &&
        currStatus !== "closed" &&
        userType === "company" && (
          <ChangeStatusButton
            projectId={projectId}
            setStatus={setCurrStatus}
            status={currStatus}
          />
        )}

      <hr className="border-zinc-400 my-4" />

      <div className="p-4">
        <MultiLine
          text={projDetail.description}
          className="text-zinc-300 font-thin break-words"
        />
      </div>

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
    </div>
  )
}

export default ProjectMeta
