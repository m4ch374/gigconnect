import InputField from "components/InputField"
import React, { useContext } from "react"
import CreateProjectContext from "./CreateProjectContext"

const CreateLocation: React.FC = () => {
  const projectContext = useContext(CreateProjectContext)

  const projectData = projectContext[0]
  const setProjectData = projectContext[3]

  return (
    <div className="flex w-full h-full pt-10 px-4 md:items-center md:justify-center md:pt-0 md:px-20">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold text-sky-200">
            Choose where your dream starts.
          </h1>
          <h3>
            Whether it is In-Person or Remote, your dream could happen anywhere,
            anytime!
          </h3>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-lg">Add a location of your project!</h3>
          <InputField
            placeholder="Leave it empty for remote projects"
            value={projectData.location}
            onChange={e => {
              const currValue = e.currentTarget.value
              if (!currValue) {
                setProjectData(s => ({ ...s, inPerson: true, location: "" }))
                return
              }
              setProjectData(s => ({
                ...s,
                inPerson: false,
                location: currValue,
              }))
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateLocation
