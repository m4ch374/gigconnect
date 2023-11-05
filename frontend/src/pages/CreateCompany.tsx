import useToken from "hooks/Token.hooks"
import useUserType from "hooks/UserType.hooks"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCompany } from "services/auth.services"
import { TCreateComp } from "services/types"

const CreateCompany: React.FC = () => {
  const emailRegex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
  const abnRegex = new RegExp("^[0-9]{11}$")

  const navigate = useNavigate()
  const { setUserType } = useUserType()
  const { setToken } = useToken()

  const [formData, setFormData] = useState<TCreateComp["requestType"]>({
    email: "",
    password: "",
    companyName: "",
    abn: "",
  })

  const [confirmPass, setConfirmPass] = useState("")
  const [formError, setFormError] = useState("")

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.password != confirmPass) {
      setFormError("Passwords do not match.")
      return
    }
    if (!emailRegex.test(formData.email)) {
      setFormError("Please input a valid email address.")
      return
    }
    if (formData.companyName == "") {
      setFormError("Please input a valid company name.")
      return
    }
    if (!abnRegex.test(formData.abn)) {
      setFormError("Please input a valid ABN.")
      return
    }
    if (formData.password.length < 8) {
      setFormError("Password should be at least 8 characters long.")
    }

    ;(async () => {
      const res = await createCompany(formData)

      if (!res.ok) {
        setFormError(res.error)
        return
      }

      if (res.data.userType === "company") {
        setToken(res.data.loginToken)
        setUserType(res.data.userType)
        navigate("/setup-company")
        return
      }

      setFormError("Invalid response recieved.")
    })()
  }

  return (
    <div className=" w-11/12 sm:w-[600px] mx-auto pb-8">
      <h1 className="text-4xl font-bold pt-6 text-center">
        Create company account
      </h1>
      <form onSubmit={submitForm} onChange={() => setFormError("")}>
        <label htmlFor="form-email" className="block pt-4 pb-2 text-bold">
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
        <label
          htmlFor="form-company-name"
          className="block pt-4 pb-2 text-bold"
        >
          Company name
        </label>
        <input
          type="text"
          id="form-company-name"
          onChange={e =>
            setFormData({ ...formData, companyName: e.currentTarget.value })
          }
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <label htmlFor="form-abn" className="block pt-4 pb-2 text-bold">
          ABN
        </label>
        <p>ABN should be an 11 digit number.</p>
        <input
          type="text"
          id="form-abn"
          onChange={e =>
            setFormData({ ...formData, abn: e.currentTarget.value })
          }
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <label htmlFor="form-pass" className="block pt-4 pb-2 text-bold">
          Password
        </label>
        <p>Password should be at least 8 characters long.</p>
        <input
          type="password"
          id="form-pass"
          onChange={e =>
            setFormData({ ...formData, password: e.currentTarget.value })
          }
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <label
          htmlFor="form-confirm-pass"
          className="block pt-4 pb-2 text-bold"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="form-confirm-pass"
          onChange={e => setConfirmPass(e.currentTarget.value)}
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <button
          type="submit"
          className="block w-full mt-8 p-2 bg-cyan-600 hover:bg-cyan-500 text-center rounded-md drop-shadow-md text-white font-bold"
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

export default CreateCompany
