// Use by home page, a thumbnail for previewing projects
import Building from "assets/icons/Building"
import MapPin from "assets/icons/MapPin"
import React, { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { ListedProjectData } from "types/project.types"

type TProjectPreview = {
  projectDetail: ListedProjectData
  navRoute: string
}

const ProjectPreview: React.FC<TProjectPreview> = ({
  projectDetail,
  navRoute,
}) => {
  const {
    companyName,
    creationDate,
    inPerson,
    publicDescription,
    tags,
    title,
    location,
  } = projectDetail

  const navigate = useNavigate()

  // Ugly asf
  const postedTime = useMemo(() => {
    const diff = new Date().getTime() - new Date(creationDate).getTime()

    const diffDays = Math.floor(diff / (3600000 * 24))

    if (!diffDays) return "today"

    if (diffDays === 7) return "a week ago"

    if (diffDays > 7) return "more than a week ago"

    if (diffDays !== 1) return `${diffDays} days ago`

    return "a day ago"
  }, [creationDate])

  return (
    <div
      className="p-4 group hover:bg-sky-300/10 cursor-pointer"
      onClick={() => navigate(navRoute)}
    >
      <h3 className="group-hover:text-sky-300 font-semibold text-lg truncate my-2">
        {title}
      </h3>

      <div className="mt-4 mb-2 flex items-center text-xs text-zinc-300 font-thin">
        <Building className="w-3 h-3 mr-1" />
        <h6>
          {companyName} &#x2022; Posted {postedTime}
        </h6>
      </div>

      <h3 className="text-zinc-300 break-words line-clamp-4">
        {publicDescription}
      </h3>

      <div className="my-2 flex gap-2 flex-wrap max-w-[500px]">
        {tags.map((tag, idx) => {
          return (
            <h3
              key={idx}
              className="bg-sky-500/30 text-sky-100 text-xs px-4 py-1 rounded-full"
            >
              {tag}
            </h3>
          )
        })}
      </div>

      <div className="flex items-center font-thin text-zinc-300 gap-1 text-xs">
        <MapPin className="w-4 h-4" />
        {inPerson ? <h3>{location || "No Location Provided"}</h3> : <></>}
        {inPerson ? <h3>&#x2022;</h3> : <></>}
        <h3>{inPerson ? "In-Person" : "Remote"}</h3>
      </div>
    </div>
  )
}

export default ProjectPreview
