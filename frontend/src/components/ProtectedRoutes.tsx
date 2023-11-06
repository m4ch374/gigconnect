import Wifi from "assets/icons/Wifi"
import useToken from "hooks/Token.hooks"
import useUserType from "hooks/UserType.hooks"
import React from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { logout } from "services/auth.services"

const ProtectedRoutes: React.FC = () => {
  const navigate = useNavigate()
  const setToken = useToken().setToken
  const setUserType = useUserType().setUserType

  if (!localStorage.getItem("token")) return <Navigate to="/login" />

  return (
    <div>
      <div
        className="
          w-full
          fixed
          top-0
          left-0
          backdrop-blur-lg
          h-[70px]
          flex
          items-center
          justify-between
          px-8
          z-50
        "
      >
        <button
          className="flex flex-row items-center gap-4"
          onClick={() => navigate("/home")}
        >
          <Wifi />
          <h1 className="font-bold text-4xl">GigConnect</h1>
        </button>

        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-green-400 text-2xl rounded-md"
            onClick={() => {
              navigate("/create-project")
            }}
          >
            Create
          </button>
          <button
            className="px-2 py-1 bg-red-400 text-2xl rounded-md"
            onClick={() => {
              ;(async () => {
                await logout()

                setToken("")
                setUserType("unknown")
                navigate("/login")
              })()
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-[70px]">
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedRoutes
