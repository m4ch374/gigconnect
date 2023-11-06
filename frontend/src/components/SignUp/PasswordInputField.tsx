import EyeSlash from "assets/icons/EyeSlash"
import React, { ChangeEventHandler, useState } from "react"

type TPasswordInputField = {
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

const PasswordInputField: React.FC<TPasswordInputField> = ({
  placeholder,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="py-2 px-4 border border-zinc-400 flex justify-between rounded-md">
      <input
        className="bg-transparent text-sm outline-none w-full"
        placeholder={placeholder}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        className="text-zinc-400"
        onClick={() => setShowPassword(s => !s)}
      >
        <EyeSlash />
      </button>
    </div>
  )
}

export default PasswordInputField
