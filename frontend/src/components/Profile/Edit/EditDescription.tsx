import React, { ChangeEventHandler } from "react"

type TEditDescription = {
  textOnChange?: ChangeEventHandler<HTMLTextAreaElement>
  textValue?: string
}

const EditDescription: React.FC<TEditDescription> = ({
  textOnChange,
  textValue,
}) => {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <textarea
        className="bg-transparent border border-zinc-400 rounded-md w-full h-full p-2 outline-none min-h-[200px] focus:border-zinc-200"
        placeholder="We would love to know you!"
        onChange={textOnChange}
        value={textValue}
      />
    </div>
  )
}

export default EditDescription
