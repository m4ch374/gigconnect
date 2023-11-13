import React, { ChangeEventHandler } from "react"
import { twMerge } from "tailwind-merge"

type TInputField = {
  placeholder?: string
  className?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string
}

const InputField: React.FC<TInputField> = ({
  placeholder = "",
  className = "",
  onChange,
  value,
}) => {
  return (
    <input
      className={twMerge(
        "bg-transparent border border-zinc-400 rounded-md py-2 px-4 text-sm outline-none focus:border-zinc-200",
        className,
      )}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type="text"
    />
  )
}

export default InputField
