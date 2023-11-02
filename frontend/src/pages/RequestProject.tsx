import { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  apiCreateProjectRequest,
  getProjectDetailsProfessional,
} from "services/project.services"

const RequestProject: React.FC = () => {
  const params = useParams()
  const projectId = params.projectId || ""
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)
  const [formError, setFormError] = useState("")
  const [companyName, setCompanyName] = useState("the company")
  const [projectName, setProjectName] = useState("the project")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      if (projectId === "") {
        setFetchError(true)
        setLoading(false)
        return
      }
      try {
        const projectData = await getProjectDetailsProfessional({
          projectId: projectId,
        })
        setProjectName(projectData.title)
        setCompanyName(projectData.companyName)
      } catch {
        setFetchError(true)
      }
      setLoading(false)
    })()
  }, [projectId])

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    ;(async () => {
      try {
        await apiCreateProjectRequest({
          projectId: projectId,
          message: message,
        })
        navigate(-1)
      } catch {
        setFormError("An error occured while sending the request.")
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
            {`Request to join project '${projectName}'`}
          </h1>
          <form onSubmit={submitForm}>
            <p className="pt-2">
              Your{" "}
              <Link
                to="/professional-myprofile"
                className="text-cyan-400 hover:underline"
              >
                public profile
              </Link>{" "}
              will be shared with {companyName} when you send this request.
            </p>
            <label htmlFor="description" className="block pt-4 pb-2 font-bold">
              Leave a message for {companyName}:
            </label>
            <textarea
              id="description"
              className="block w-full h-32 sm:h-64 p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="block w-full mt-8 p-2 bg-cyan-600 hover:bg-cyan-500 text-center rounded-md drop-shadow-md text-white font-bold"
            >
              Send Request
            </button>
            {formError && (
              <div className="w-full mt-4 p-2 bg-red-700 border border-red-500 rounded-md text-white">
                <p>{formError}</p>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  )
}

export default RequestProject
