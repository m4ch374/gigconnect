import InputField from "components/InputField"
import React, { useContext, useEffect } from "react"
import CreateProjectContext from "./CreateProjectContext"
import DisablingContext from "./DisablingContext"

const CreateTitle: React.FC = () => {
  const createProjectController = useContext(CreateProjectContext)
  const { title } = createProjectController[0]
  const setObj = createProjectController[1]

  const setDisabled = useContext(DisablingContext)[1]

  useEffect(() => {
    setDisabled(!title)
  }, [setDisabled, title])

  return (
    <div className="flex w-full h-full pt-10 px-4 md:items-center md:justify-center md:pt-0 md:px-20">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold text-sky-200">
            Let&apos;s start with a strong title.
          </h1>
          <h3>
            This helps professionals to join your project, make it sound and
            make it eye catching!
          </h3>
        </div>
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-lg">Write a title for your project!</h3>
          <InputField
            className="w-full"
            placeholder="Project Title"
            value={title}
            onChange={e => setObj("title", e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default CreateTitle
