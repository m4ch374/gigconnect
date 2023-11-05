import useToken from "hooks/Token.hooks"
import useUserType from "hooks/UserType.hooks"
import React, { useState, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "services/auth.services"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [formError, setFormError] = useState("")

  const navigate = useNavigate()
  const { setUserType } = useUserType()
  const { setToken } = useToken()

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    ;(async () => {
      const res = await login({ email, password: pass })

      console.log(res.data)

      if (!res.ok) {
        setFormError(res.error)
        return
      }

      setToken(res.data.loginToken)
      switch (res.data.userType) {
        case "admin":
          navigate("/admin-dashboard")
          break
        case "company":
          navigate("/company-myprofile")
          break
        case "professional":
          navigate("/professional-myprofile")
          break
        default:
          setFormError("invalid response received.")
          return
      }

      setUserType(res.data.userType)
    })()
  }

  return (
    <div className=" w-11/12 sm:w-[600px] mx-auto pb-8">
      <h1 className="text-4xl font-bold pt-6 text-center">Login</h1>
      <form onSubmit={submitForm} onChange={() => setFormError("")}>
        <label htmlFor="login-email" className="block pt-4 pb-2 font-bold">
          Email address
        </label>
        <input
          type="text"
          id="login-email"
          onChange={e => setEmail(e.currentTarget.value)}
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />
        <label htmlFor="login-pass" className="block pt-4 pb-2 font-bold">
          Password
        </label>
        <input
          type="password"
          id="login-pass"
          onChange={e => setPass(e.currentTarget.value)}
          className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
        />

        <button
          type="submit"
          className="block w-full mt-8 p-2 bg-cyan-600 hover:bg-cyan-500 text-center rounded-md drop-shadow-md text-white font-bold"
        >
          Login
        </button>
        {formError && (
          <div className="w-full mt-4 p-2 bg-red-700 border border-red-500 rounded-md text-white">
            <p>{formError}</p>
          </div>
        )}
      </form>
      <p className="pt-4">Don&apos;t have an account yet?</p>
      <p>
        <Link
          to="/create-professional"
          className="text-cyan-400 hover:underline"
        >
          Create professional account
        </Link>
      </p>
      <p>
        <Link to="/create-company" className="text-cyan-400 hover:underline">
          Create company account
        </Link>
      </p>
    </div>
  )
}

export default Login
