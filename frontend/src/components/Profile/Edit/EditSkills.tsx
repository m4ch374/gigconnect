// General purpose components for editing skills
import Cross from "assets/icons/Cross"
import useArray from "hooks/UseArray.hooks"
import React, { useState } from "react"
import toast from "react-hot-toast"

const SkillItem: React.FC<{
  skill: string
  removeCb: (cb: (item: string) => boolean) => void
}> = ({ skill, removeCb }) => {
  return (
    <div className="flex gap-1 px-2 py-0.5 bg-sky-400 rounded-full text-sky-100 text-sm justify-center items-center">
      <h1>{skill}</h1>
      <button
        className="rounded-full hover:bg-black/10"
        type="button"
        onClick={() => removeCb(item => skill !== item)}
      >
        <Cross className="w-5 h-5" />
      </button>
    </div>
  )
}

type TEditSkills = {
  skillsArrayController: ReturnType<typeof useArray<string>>
}

const EditSkills: React.FC<TEditSkills> = ({ skillsArrayController }) => {
  const [currSkill, setCurrSkill] = useState("")

  const { arr, pushItem, removeCb } = skillsArrayController

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault()
        if (!currSkill) {
          toast.error("Skill cannot be empty")
          return
        }

        if (arr.includes(currSkill)) {
          toast.error("Cannot add the same skill twice.")
          return
        }

        pushItem(currSkill)
        setCurrSkill("")
      }}
    >
      <div className="w-full border border-zinc-400 rounded-md p-2 text-sm flex flex-wrap gap-2 focus-within:border-zinc-200">
        {arr.map((skill, idx) => {
          return <SkillItem skill={skill} key={idx} removeCb={removeCb} />
        })}
        <input
          className="flex-1 min-w-[200px] w-full bg-transparent outline-none"
          placeholder="Add Skill"
          value={currSkill}
          onChange={e => setCurrSkill(e.currentTarget.value)}
        />
      </div>
      <button
        className="self-end px-4 py-1 rounded-full bg-sky-400"
        type="submit"
      >
        Add
      </button>
    </form>
  )
}

export default EditSkills
