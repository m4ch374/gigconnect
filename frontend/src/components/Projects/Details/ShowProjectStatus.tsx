// Shows the project status on the top left coner
// Referenced in ProjectMeta.tsx
import CheckCircle from "assets/icons/CheckCircle"
import Clock from "assets/icons/Clock"
import Wifi from "assets/icons/Wifi"
import React from "react"
import { ProjectStatus } from "types/general.types"

type TShowProjectStatus = {
  status: ProjectStatus
}

const ShowProjectStats: React.FC<TShowProjectStatus> = ({ status }) => {
  return (
    <div
      className={`${
        status === "open"
          ? "text-green-400"
          : status === "inprogress"
          ? "text-amber-400"
          : "text-sky-400"
      } font-thin flex gap-1 items-center`}
    >
      {status === "open" ? (
        <Wifi className="w-5 h-5" />
      ) : status === "inprogress" ? (
        <Clock className="w-5 h-5" />
      ) : (
        <CheckCircle className="w-5 h-5" />
      )}
      <h3>{status}</h3>
    </div>
  )
}

export default ShowProjectStats
