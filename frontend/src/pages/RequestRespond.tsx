import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  apiGetProfessionalById,
  apiProjectRequestRespond,
} from "services/professional.services"
import { getProjectDetailsCompany } from "services/project.services"
import { ProjectRequestData } from "types/project.types"

const RequestRespond: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const projectId = params.projectId || ""
  const requestId = params.requestId || ""

  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)
  const [requestData, setRequestData] = useState({
    userId: "",
    userName: "",
    message: "",
  })
  const [actionError, setActionError] = useState("")

  const getProjectRequest = (requestsArr: ProjectRequestData[], id: string) => {
    for (const r of requestsArr) {
      if (r.id == id) {
        return r
      }
    }
    return null
  }

  useEffect(() => {
    ;(async () => {
      try {
        const projectData = await getProjectDetailsCompany({
          projectId: projectId,
        })
        const projectRequest = getProjectRequest(
          projectData.requests,
          requestId,
        )
        if (projectRequest) {
          const userData = await apiGetProfessionalById({
            userId: projectRequest.userId,
          })
          setRequestData({
            userId: projectRequest.userId,
            userName: `${userData.firstName} ${userData.lastName}`,
            message: requestData.message,
          })
        } else {
          setFetchError(true)
        }
      } catch {
        setFetchError(true)
      }
      setLoading(false)
    })()
  }, [])

  const accept = () => {
    setActionError("")
    ;(async () => {
      try {
        await apiProjectRequestRespond({
          requestId: requestId,
          accepted: true,
        })
        navigate(`/home/details/${projectId}`)
      } catch {
        setActionError("An error occued while accepting the request.")
      }
    })()
  }
  const reject = () => {
    setActionError("")
    ;(async () => {
      try {
        await apiProjectRequestRespond({
          requestId: requestId,
          accepted: false,
        })
        navigate(`/home/details/${projectId}`)
      } catch {
        setActionError("An error occued while accepting the request.")
      }
    })()
  }

  return (
    <div className="w-11/12 sm:w-[600px] mx-auto pb-8">
      {loading ? (
        <h2 className="text-xl sm:text-2xl font-bold pt-4 text-center">
          Loading...
        </h2>
      ) : fetchError ? (
        <div className="w-full mt-4 p-2 bg-red-700 border border-red-500 rounded-md">
          <p>Error loading project data.</p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold pt-6 text-center">
            {`${requestData.userName} has requested to join your project!`}
          </h1>
          {/* Insert text and link to professional user's profile here */}
          <p>{requestData.message}</p>
          <div className="flex space-x-2">
            <button
              type="button"
              className="block w-full mt-8 p-2 bg-green-600 hover:bg-green-500 text-center rounded-md drop-shadow-md text-white font-bold"
              onClick={accept}
            >
              Accept
            </button>
            <button
              type="button"
              className="block w-full mt-8 p-2 bg-red-600 hover:bg-red-500 text-center rounded-md drop-shadow-md text-white font-bold"
              onClick={reject}
            >
              Reject
            </button>
          </div>
          {actionError && (
            <div className="w-full mt-4 p-2 bg-red-700 border border-red-500 rounded-md text-white">
              <p>{actionError}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default RequestRespond
