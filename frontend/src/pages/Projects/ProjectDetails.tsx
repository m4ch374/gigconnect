// Shows the project details
import ProjectMeta from "components/Projects/Details/ProjectMeta"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { apiProjectData } from "services/project.services"
import { TProjectData } from "services/types"
import DisplayApplicants from "../../components/Projects/Details/DisplayApplicants"
import useArray from "hooks/UseArray.hooks"
import { ProjectRequestData } from "types/project.types"
import DisplayMember from "components/Projects/Details/DisplayMember"
import { ProfessionalUser } from "types/professional.types"
import useUserId from "hooks/UseUserId.hoosk"
import useUserType from "hooks/UserType.hooks"
import { ProjectStatus } from "types/general.types"
import UserReviewPrompt from "components/Projects/Details/UserReviewPrompt"

const ProjectDetails: React.FC<{ useFullWidth?: boolean }> = ({
  useFullWidth = false,
}) => {
  const { projectId } = useParams()
  const userId = useUserId()
  const { userType } = useUserType()

  const [projDetail, setProjDetail] = useState<TProjectData["responseType"]>()
  const [currStatus, setCurrStatus] = useState<ProjectStatus>("open")
  const { arr, setArr, removeAt } = useArray<ProjectRequestData>([])
  const membersArray = useArray<ProfessionalUser>([])
  const memberSetArr = membersArray.setArr
  const memberRemoveAt = membersArray.removeAt

  useEffect(() => {
    if (!projectId) return
    ;(async () => {
      const res = await apiProjectData({ projectId })

      if (!res.ok) {
        toast.error(res.error)
        return
      }

      setProjDetail(res.data)
      setArr(res.data.requests)
      memberSetArr(res.data.professionals)
      setCurrStatus(res.data.status)
    })()
  }, [memberSetArr, projectId, setArr])

  // Cheese
  if (typeof projDetail === "undefined") return <></>

  return (
    <div className="w-full flex justify-center mt-4">
      <div
        className={`max-w-[1000px] flex flex-col ${
          useFullWidth ? "w-full" : "w-[90%]"
        }`}
      >
        {currStatus === "closed" &&
          userType === "professional" &&
          membersArray.arr.map(m => m.userId).includes(userId) && (
            <UserReviewPrompt
              companyId={projDetail.companyId}
              companyName={projDetail.companyName}
              companyProfilePhoto={""}
              projectId={projectId as string}
            />
          )}

        <ProjectMeta
          projDetail={projDetail}
          projectId={projectId as string}
          currStatus={currStatus}
          setCurrStatus={setCurrStatus}
        />

        {userType === "company" && userId === projDetail.companyId && (
          <>
            <DisplayMember
              className="mb-8"
              members={membersArray.arr}
              projectId={projectId as string}
              memberRemove={memberRemoveAt}
              projStatus={currStatus}
            />

            {currStatus !== "closed" && (
              <DisplayApplicants
                className="mb-8"
                requests={arr}
                removeAt={removeAt}
                membersPush={membersArray.pushItem}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ProjectDetails
