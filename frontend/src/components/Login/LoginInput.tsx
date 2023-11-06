import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react"

type TLoginInput = {
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  icon: React.FC
  type?: HTMLInputTypeAttribute
}

const LoginInput: React.FC<TLoginInput> = ({
  placeholder = "",
  onChange,
  icon,
  type,
}) => {
  return (
    <div className="border border-zinc-400 py-2 px-4 rounded-md flex gap-4">
      {icon as unknown as React.ReactNode}
      <input
        className="text-sm outline-none bg-transparent w-full text-white"
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
    </div>
  )
}

export default LoginInput
