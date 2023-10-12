import React from "react"
import Landing from "pages/Landing"
import { Route, Routes } from "react-router-dom"
import Login from "pages/Login"
import CreateCompany from "pages/CreateCompany"
import CreateProfessional from "pages/CreateProfessional"
import ProtectedRoutes from "components/ProtectedRoutes"
import CompanyMyProfile from "pages/CompanyMyProfile"
import ProfessionalMyProfile from "pages/ProfessionalMyProfile"

const App: React.FC = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/create-company" element={<CreateCompany />} />
      <Route path="/create-professional" element={<CreateProfessional />} />

      {/* Main */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Landing />} />
        <Route path="/company-myprofile" element={<CompanyMyProfile />} />
        <Route
          path="/professional-myprofile"
          element={<ProfessionalMyProfile />}
        />
      </Route>
    </Routes>
  )
}

export default App
