import React, { useState, FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "services/auth"

const Login: React.FC = () => {
  const [email, updateEmail] = useState("")
  const [pass, updatePass] = useState("")
  const [formError, updateError] = useState("")

  const navigate = useNavigate()

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    ;(async () => {
      const resp = await login({ email, password: pass })

      console.log(resp)

      if (typeof resp === "undefined") {
        updateError("Email or password incorrect.")
        return
      }

      localStorage.setItem("token", resp.loginToken)
      switch (resp.userType) {
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
          updateError("invalid response received.")
      }
    })()
  }

  return (
    <div className=" w-11/12 sm:w-[600px] mx-auto">
      <h1 className="text-4xl font-bold pt-6 text-center">Login</h1>
      <form onSubmit={submitForm} onChange={() => updateError("")}>
        <label htmlFor="login-email" className="block pt-4 pb-2">
          Email address
        </label>
        <input
          type="text"
          id="login-email"
          onChange={e => updateEmail(e.currentTarget.value)}
          className="text-black w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
        />
        <label htmlFor="login-pass" className="block pt-4 pb-2">
          Password
        </label>
        <input
          type="password"
          id="login-pass"
          onChange={e => updatePass(e.currentTarget.value)}
          className="text-black w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
        />
        <button
          type="submit"
          className="text-black w-full mt-8 p-2 bg-cyan-400 hover:bg-cyan-300 text-center rounded-md drop-shadow-md"
        >
          Login
        </button>
        {formError && (
          <div className="w-full mt-4 p-2 bg-red-300 border border-red-500 rounded-md">
            <p>{formError}</p>
          </div>
        )}
      </form>
      <div className="mt-4 text-sm">
        <h6>Don&apos;t have an account yet?</h6>
        <Link
          to="/create-professional"
          className="text-cyan-600 hover:underline block"
        >
          Create professional account
        </Link>
        <Link to="/create-company" className="text-cyan-600 hover:underline">
          Create company account
        </Link>
      </div>
    </div>
  )
}

export default Login
