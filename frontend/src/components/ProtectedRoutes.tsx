// A protected route, wrapping all the other pages that requires user authentication
import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import NavBar from "./NavBar/NavBar"

const ProtectedRoutes: React.FC = () => {
  if (!localStorage.getItem("token")) return <Navigate to="/login" />

  return (
    <div>
      <NavBar />

      <div className="pt-[70px]">
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedRoutes
