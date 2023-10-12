import Wifi from "assets/icons/Wifi"
import React from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { logout } from "services/auth"

const ProtectedRoutes: React.FC = () => {
  const navigate = useNavigate()

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
        "
      >
        <button
          className="flex flex-row items-center gap-4"
          onClick={() => navigate("/")}
        >
          <Wifi />
          <h1 className="font-bold text-4xl">GigConnect</h1>
        </button>

        <button
          className="px-2 py-1 bg-red-400 text-2xl rounded-md"
          onClick={() => {
            ;(async () => {
              await logout()

              navigate("/login")
              localStorage.removeItem("token")
            })()
          }}
        >
          Logout
        </button>
      </div>

      <div className="mt-[70px] overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedRoutes
