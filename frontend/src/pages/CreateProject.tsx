import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { apiCreateProject } from "services/project.services"
import { CreateProjectData } from "types/project.types"

const CreateProject: React.FC = () => {
  const [formData, setFormData] = useState<CreateProjectData>({
    title: "",
    publicDescription: "",
    privateDescription: "",
    tags: [],
    inPerson: true,
    location: "",
  })
  const [newTag, setNewTag] = useState("")
  const [formError, setFormError] = useState("")

  const navigate = useNavigate()

  const addTag = () => {
    if (newTag === "") {
      setFormError("Keyword cannot be empty.")
      return
    }
    const newArr = [...formData.tags]
    newArr.push(newTag)
    setFormData({ ...formData, tags: newArr })
    setNewTag("")
    setFormError("")
  }

  const removeTag = (i: number) => {
    const newArr = formData.tags.filter((_, k) => {
      return i != k
    })
    setFormData({ ...formData, tags: newArr })
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.title === "") {
      setFormError("Please enter a project name.")
      return
    }

    if (formData.inPerson && formData.location === "") {
      setFormError("Please enter a location for an in-person project.")
      return
    }
    ;(async () => {
      const res = await apiCreateProject(formData)
      if (typeof res === "undefined") {
        setFormError("An error occured while creating the project.")
      } else {
        navigate(`/home/details/${res.projectId}`)
      }
    })()
  }

  return (
    <div className="w-11/12 sm:w-[600px] mx-auto pb-8">
      <h1 className="text-4xl font-bold pt-6 text-center">
        Create New Project
      </h1>
      <form onSubmit={submitForm} onChange={() => setFormError("")}>
        <label
          htmlFor="project-create-title"
          className="block pt-4 pb-2 font-bold"
        >
          Project Title
        </label>
        <input
          type="text"
          id="project-create-title"
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
          onChange={e => {
            setFormData({ ...formData, title: e.target.value })
          }}
        />
        <label
          htmlFor="project-create-publicd"
          className="block pt-4 pb-2 font-bold"
        >
          Public Description - this can be seen by anyone on the site.
        </label>
        <textarea
          id="project-create-publicd"
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
          onChange={e => {
            setFormData({ ...formData, publicDescription: e.target.value })
          }}
        />
        <label
          htmlFor="project-create-privated"
          className="block pt-4 pb-2 font-bold"
        >
          Private Description - this can only be seen by you and professionals
          who you add to the project.
        </label>
        <textarea
          id="project-create-privated"
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
          onChange={e => {
            setFormData({ ...formData, privateDescription: e.target.value })
          }}
        />

        <div className="block pt-4 pb-2 font-bold">Keywords</div>
        {formData.tags.map((i, k) => (
          <div className="flex space-x-1 mb-2" key={k}>
            <div className="block w-full p-2 border border-cyan-400 hover:bg-cyan-900 text-cyan-400 text-left rounded-md">
              <p>{i}</p>
            </div>
            <button
              type="button"
              className="block p-2 bg-red-800 hover:bg-red-700 text-center rounded-md drop-shadow-md text-white"
              onClick={() => removeTag(k)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="mt-4 flex space-x-1 mb-2">
          <input
            type="text"
            className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
            placeholder="Type a keyword here"
            value={newTag}
            onChange={e => {
              setNewTag(e.target.value)
            }}
          />
          <button
            type="button"
            className="block p-2 bg-green-800 hover:bg-green-700 text-center rounded-md drop-shadow-md text-white"
            onClick={addTag}
          >
            Add
          </button>
        </div>

        <div className="block pt-4 pb-2 font-bold">Project type</div>
        <div className="flex space-x-4">
          <div>
            <input
              id="create-project-inperson"
              type="radio"
              name="location"
              onClick={() => {
                setFormData({ ...formData, inPerson: true })
              }}
            />
            <label htmlFor="create-project-inperson" className="pl-2">
              In Person
            </label>
          </div>
          <div>
            <input
              id="create-project-remote"
              type="radio"
              name="location"
              onClick={() => {
                setFormData({ ...formData, inPerson: false })
              }}
            />
            <label htmlFor="create-project-remote" className="pl-2">
              Remote
            </label>
          </div>
        </div>

        {formData.inPerson && (
          <>
            <label
              htmlFor="project-create-location"
              className="block pt-4 pb-2 font-bold"
            >
              Location
            </label>
            <input
              type="text"
              id="project-create-location"
              className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
              onChange={e => {
                setFormData({ ...formData, location: e.target.value })
              }}
            />
          </>
        )}

        <button
          type="submit"
          className="block w-full mt-8 p-2 bg-cyan-600 hover:bg-cyan-500 text-center rounded-md drop-shadow-md text-white font-bold"
        >
          Create Project
        </button>

        {formError && (
          <div className="w-full mt-4 p-2 bg-red-700 border border-red-500 rounded-md text-white">
            <p>{formError}</p>
          </div>
        )}
      </form>
    </div>
  )
}
export default CreateProject
