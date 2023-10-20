import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createProfessional } from "services/auth.services"
import { TCreatePro } from "services/types"

const CreateProfessional: React.FC = () => {
  const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")

  const [formData, setFormData] = useState<TCreatePro["requestType"]>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  })

  const [confirmPass, updateConfirmPass] = useState("")
  const [formError, updateError] = useState("")

  const navigate = useNavigate()

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password != confirmPass) {
      updateError("Passwords do not match.")
      return
    }

    if (!emailRegex.test(formData.email)) {
      updateError("Please input a valid email address.")
      return
    }

    if (formData.firstName == "") {
      updateError("Please input a valid first name.")
      return
    }

    if (formData.lastName == "") {
      updateError("Please input a valid last name.")
    }

    ;(async () => {
      const resp = await createProfessional(formData)

      if (typeof resp === "undefined") {
        updateError("Unable to create account.")
        return
      }

      if (resp.userType === "professional") {
        localStorage.setItem("token", resp.loginToken)
        navigate("/setup-professional")
        return
      }

      updateError("Invalid response recieved.")
    })()
  }

  return (
    <div className=" w-11/12 sm:w-[600px] mx-auto">
      <h1 className="text-4xl font-bold pt-6 text-center">
        Create professional account
      </h1>
      <form onSubmit={submitForm} onChange={() => updateError("")}>
        <label htmlFor="form-email" className="block pt-4 pb-2">
          Email address
        </label>
        <input
          type="text"
          id="form-email"
          onChange={e =>
            setFormData({ ...formData, email: e.currentTarget.value })
          }
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <label htmlFor="form-first-name" className="block pt-4 pb-2">
          First name
        </label>
        <input
          type="text"
          id="form-first-name"
          onChange={e =>
            setFormData({ ...formData, firstName: e.currentTarget.value })
          }
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <label htmlFor="form-last-name" className="block pt-4 pb-2">
          Last name
        </label>
        <input
          type="text"
          id="form-last-name"
          onChange={e =>
            setFormData({ ...formData, lastName: e.currentTarget.value })
          }
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <label htmlFor="form-pass" className="block pt-4 pb-2">
          Password
        </label>
        <input
          type="password"
          id="form-pass"
          onChange={e =>
            setFormData({ ...formData, password: e.currentTarget.value })
          }
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <label htmlFor="form-confirm-pass" className="block pt-4 pb-2">
          Confirm password
        </label>
        <input
          type="password"
          id="form-confirm-pass"
          onChange={e => updateConfirmPass(e.currentTarget.value)}
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <button
          type="submit"
          className="block w-full mt-8 p-2 bg-cyan-600 hover:bg-cyan-500 text-center rounded-md drop-shadow-md text-white"
        >
          Create account
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

export default CreateProfessional
