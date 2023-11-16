// Add project with keywords
import Plus from "assets/icons/Plus"
import InputField from "components/InputField"
import useArray from "hooks/UseArray.hooks"
import React, { FormEvent, useContext, useEffect, useState } from "react"
import CreateProjectContext from "./CreateProjectContext"
import Cross from "assets/icons/Cross"
import DisablingContext from "./DisablingContext"

const CreateKeywords: React.FC = () => {
  const createProjController = useContext(CreateProjectContext)

  const [currSkill, setCurrSkill] = useState("")

  const tags = createProjController[0].tags
  const { arr, pushItem, removeAt } = useArray<string>(tags)

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    pushItem(currSkill)
    setCurrSkill("")
  }

  const setDisabled = useContext(DisablingContext)[1]

  useEffect(() => {
    createProjController[1]("tags", arr)
    setDisabled(arr.length === 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr, setDisabled])

  return (
    <div className="flex w-full h-full pt-10 px-4 md:items-center md:justify-center md:pt-0 md:px-20">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold text-sky-200">
            Add tags and keywords for your project
          </h1>
        </div>
        <div className="w-full flex flex-col gap-2">
          <form className="flex gap-2 w-full" onSubmit={onFormSubmit}>
            <InputField
              className="w-full"
              placeholder="Required Skill"
              value={currSkill}
              onChange={e => setCurrSkill(e.currentTarget.value)}
            />
            <button type="submit" className="p-2 bg-sky-400 rounded-md">
              <Plus />
            </button>
          </form>

          <h1 className="mt-10">Tags and Keywords Added:</h1>
          <div className="flex gap-2 flex-wrap">
            {arr.map((tag, idx) => (
              <div
                key={idx}
                className="flex gap-1 bg-sky-400 rounded-full px-2 py-0.5 justify-center items-center"
              >
                <h3 className="text-sm">{tag}</h3>
                <button
                  type="button"
                  className="rounded-full hover:bg-sky-800/30 p-1"
                  onClick={() => removeAt(idx)}
                >
                  <Cross className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateKeywords
