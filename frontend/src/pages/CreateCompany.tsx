import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCompany } from "services/auth"
import { TCreateComp } from "services/types"

const CreateCompany: React.FC = () => {
  const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
  const abnRegex = new RegExp("^[0-9]{11}%")

  const navigate = useNavigate()

  const [formData, setFormData] = useState<TCreateComp["requestType"]>({
    email: "",
    password: "",
    companyName: "",
    abn: "",
  })

  const [confirmPass, updateConfirmPass] = useState("")
  const [formError, updateError] = useState("")

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

    if (formData.companyName == "") {
      updateError("Please input a valid company name")
      return
    }

    if (!abnRegex.test(formData.abn)) {
      updateError("Please input a valid ABN.")
      return
    }

    ;(async () => {
      const resp = await createCompany(formData)

      if (typeof resp === "undefined") {
        updateError("Unable to create account.")
        return
      }

      if (resp.userType === "company") {
        localStorage.setItem("token", resp.token)
        navigate("/company-myprofile")
        return
      }

      updateError("Invalid response recieved.")
    })()
  }

  return (
    <div className=" w-11/12 sm:w-[600px] mx-auto">
      <h1 className="text-4xl font-bold pt-6 text-center">
        Create company account
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
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
        />
        <label htmlFor="form-company-name" className="block pt-4 pb-2">
          Company name
        </label>
        <input
          type="text"
          id="form-company-name"
          onChange={e =>
            setFormData({ ...formData, companyName: e.currentTarget.value })
          }
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
        />
        <label htmlFor="form-abn" className="block pt-4 pb-2">
          ABN
        </label>
        <input
          type="text"
          id="form-abn"
          onChange={e =>
            setFormData({ ...formData, abn: e.currentTarget.value })
          }
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
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
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
        />
        <label htmlFor="form-confirm-pass" className="block pt-4 pb-2">
          Confirm password
        </label>
        <input
          type="password"
          id="form-confirm-pass"
          onChange={e => updateConfirmPass(e.currentTarget.value)}
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
        />
        <button
          type="submit"
          className="block w-full my-2 p-2 bg-cyan-400 hover:bg-cyan-300 text-center rounded-md drop-shadow-md"
        >
          Create account
        </button>
        {formError && (
          <div className="w-full mt-4 p-2 bg-red-300 border border-red-500 rounded-md">
            <p>{formError}</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default CreateCompany