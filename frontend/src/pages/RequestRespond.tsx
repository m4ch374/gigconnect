import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
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
  const [fetchError, setFetchError] = useState("")
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
      const projectRes = await getProjectDetailsCompany({
        projectId: projectId,
      })

      if (!projectRes.ok) {
        setFetchError(`Unable to load data: ${projectRes.error}`)
        setLoading(false)
        return
      }

      const projectRequest = getProjectRequest(
        projectRes.data.requests,
        requestId,
      )

      if (projectRequest) {
        const userRes = await apiGetProfessionalById({
          userId: projectRequest.userId,
        })

        if (!userRes.ok) {
          setFetchError(`Unable to load data: ${userRes.error}`)
          setLoading(false)
          return
        }

        setRequestData({
          userId: projectRequest.userId,
          userName: `${userRes.data.firstName} ${userRes.data.lastName}`,
          message: requestData.message,
        })
      } else {
        setFetchError("Invalid project.")
      }
      setLoading(false)
    })()
  }, [projectId, requestData.message, requestId])

  const accept = () => {
    setActionError("")
    ;(async () => {
      const res = await apiProjectRequestRespond({
        requestId: requestId,
        accepted: true,
      })

      if (!res.ok) {
        setActionError(res.error)
        return
      }

      navigate(`/home/details/${projectId}`)
    })()
  }
  const reject = () => {
    setActionError("")
    ;(async () => {
      const res = await apiProjectRequestRespond({
        requestId: requestId,
        accepted: false,
      })

      if (!res.ok) {
        setActionError(res.error)
        return
      }

      navigate(`/home/details/${projectId}`)
    })()
  }

  return (
    <div className="w-11/12 sm:w-[600px] mx-auto pb-8">
      {loading ? (
        <h2 className="text-xl sm:text-2xl font-bold pt-4 text-center">
          Loading...
        </h2>
      ) : fetchError !== "" ? (
        <div className="w-full mt-4 p-2 bg-red-700 border border-red-500 rounded-md">
          <p>Error loading project data.</p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold pt-6 text-center">
            {`${requestData.userName} has requested to join your project!`}
          </h1>
          <Link
            to={`/professional/${requestData.userId}`}
            className="block pt-2 font-bold text-cyan-600 hover:underline"
          >
            See {requestData.userName}&apos;s profile
          </Link>
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
