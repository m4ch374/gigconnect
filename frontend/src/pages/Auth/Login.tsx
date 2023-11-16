import Lock from "assets/icons/Lock"
import User from "assets/icons/User"
import LoginInput from "components/Auth/LoginInput"
import useToken from "hooks/Token.hooks"
import useObject from "hooks/UseObject.hooks"
import useUserType from "hooks/UserType.hooks"
import React, { FormEvent } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { login } from "services/auth.services"
import { TLogin } from "services/types"

const Login: React.FC = () => {
  const navigate = useNavigate()
  const setUserType = useUserType().setUserType
  const setToken = useToken().setToken

  const [data, setData] = useObject<TLogin["requestType"]>({
    email: "",
    password: "",
  })

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    ;(async () => {
      const resp = await login(data)

      if (!resp.ok) {
        toast.error(resp.error)
        return
      }

      setUserType(resp.data.userType)
      setToken(resp.data.loginToken)

      navigate("/")
    })()
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="border border-zinc-400 rounded-lg p-4 w-[90%] max-w-[500px] flex flex-col items-center">
        <h1 className="font-bold text-3xl my-4 text-center">
          Login to GigConnect
        </h1>

        <form
          className="w-full flex flex-col items-center"
          onSubmit={handleLogin}
        >
          {/* skill issue */}
          <div className="flex flex-col gap-4 my-8 w-full text-zinc-400">
            <LoginInput
              icon={(<User />) as unknown as React.FC}
              placeholder="User Email"
              onChange={e => setData("email", e.currentTarget.value)}
            />
            <LoginInput
              icon={(<Lock />) as unknown as React.FC}
              placeholder="Password"
              onChange={e => setData("password", e.currentTarget.value)}
              type="password"
            />
          </div>

          <button
            className="px-2 py-1 w-full bg-sky-400 max-w-[300px] rounded-full"
            type="submit"
          >
            Login
          </button>
        </form>

        <div className="flex justify-evenly w-full my-8 items-center text-zinc-400 gap-4">
          <hr className="border-zinc-400 w-full" />
          <h3 className="w-auto whitespace-nowrap">
            Don&apos;t have an account?
          </h3>
          <hr className="border-zinc-400 w-full" />
        </div>

        <Link
          to={"/sign-up"}
          className="px-2 py-1 w-full border-2 border-sky-600 max-w-[300px] rounded-full text-center text-sky-400"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Login
