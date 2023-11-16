import InputField from "components/InputField"
import PasswordInputField from "components/Auth/PasswordInputField"
import useToken from "hooks/Token.hooks"
import useObject from "hooks/UseObject.hooks"
import useUserType from "hooks/UserType.hooks"
import React, { FormEvent, useCallback, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { createProfessional } from "services/auth.services"
import { TCreatePro } from "services/types"

const SignUpProfessional: React.FC = () => {
  const navigate = useNavigate()
  const setUserType = useUserType().setUserType
  const setToken = useToken().setToken

  const emailRegex = useMemo(() => {
    return new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
  }, [])

  const [confirmPassword, setConfirmPassword] = useState("")
  const [data, setData] = useObject<TCreatePro["requestType"]>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  })

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!data.firstName || !data.lastName) {
        toast.error("Name cannot be empty")
        return
      }

      if (!emailRegex.test(data.email)) {
        toast.error("Invalid email address")
        return
      }

      if (confirmPassword !== data.password) {
        toast.error("Passwords do not match")
        return
      }

      ;(async () => {
        const resp = await createProfessional(data)

        if (!resp.ok) {
          toast.error(resp.error)
          return
        }

        setUserType(resp.data.userType)
        setToken(resp.data.loginToken)
        navigate("/home")
      })()
    },
    [confirmPassword, data, emailRegex, navigate, setToken, setUserType],
  )

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        className="border border-zinc-400 w-[90%] max-w-[600px] rounded-lg p-4"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl w-full text-center font-bold my-8">
          Find work you love.
        </h1>

        <hr className="border-zinc-400" />

        <div className="flex flex-col mt-8 gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-evenly">
            <InputField
              placeholder="First Name"
              className="w-full"
              onChange={e => setData("firstName", e.currentTarget.value)}
            />
            <InputField
              placeholder="Last Name"
              className="w-full"
              onChange={e => setData("lastName", e.currentTarget.value)}
            />
          </div>
          <InputField
            placeholder="Email"
            onChange={e => setData("email", e.currentTarget.value)}
          />
          <PasswordInputField
            placeholder="Password (8 characters or more)"
            onChange={e => setData("password", e.currentTarget.value)}
          />
          <PasswordInputField
            placeholder="Confirm Password"
            onChange={e => setConfirmPassword(e.currentTarget.value)}
          />
        </div>

        <div className="mt-12 mb-4 flex flex-col gap-2">
          <button
            className="w-full px-2 py-1 bg-sky-500 rounded-full"
            type="submit"
          >
            Create Account
          </button>
          <h3 className="text-center font-thin">
            Register as a company?{" "}
            <Link to={"/sign-up/company"} className="text-sky-400 font-normal">
              Click here
            </Link>
          </h3>
        </div>
      </form>
    </div>
  )
}

export default SignUpProfessional
