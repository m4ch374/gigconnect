// General purpose component for editing professional names
import InputField from "components/InputField"
import React, { ChangeEventHandler } from "react"

type TEditProfessionalName = {
  firstName: string
  onFirstNameChange: ChangeEventHandler<HTMLInputElement>
  lastName: string
  onLastNameChange: ChangeEventHandler<HTMLInputElement>
}

const EditProfessionalName: React.FC<TEditProfessionalName> = ({
  firstName,
  onFirstNameChange,
  lastName,
  onLastNameChange,
}) => {
  return (
    <div className="flex gap-2 justify-center flex-wrap flex-1 sm:flex-nowrap">
      <InputField
        placeholder="First name"
        onChange={onFirstNameChange}
        value={firstName}
        className="w-full"
      />
      <InputField
        placeholder="Last name"
        onChange={onLastNameChange}
        value={lastName}
        className="w-full"
      />
    </div>
  )
}

export default EditProfessionalName
