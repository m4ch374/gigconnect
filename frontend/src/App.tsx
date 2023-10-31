import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "pages/Login"
import CreateCompany from "pages/CreateCompany"
import CreateProfessional from "pages/CreateProfessional"
import ProtectedRoutes from "components/ProtectedRoutes"
import CompanyMyProfile from "pages/CompanyMyProfile"
import ProfessionalMyProfile from "pages/ProfessionalMyProfile"
import AdminDashboard from "pages/AdminDashboard"
import SetupCompany from "pages/SetupCompany"
import SetupProfessional from "pages/SetupProfessional"
import CompanyEditProfile from "pages/CompanyEditProfile"
import ProfessionalEditProfile from "pages/ProfessionalEditProfile"
import CreateProject from "pages/CreateProject"
import Home from "pages/Home"

const App: React.FC = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route path="login" element={<Login />} />
      <Route path="create-company" element={<CreateCompany />} />
      <Route path="create-professional" element={<CreateProfessional />} />

      {/* Main */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route index element={<Home />} />
        <Route path="setup-company" element={<SetupCompany />} />
        <Route path="setup-professional" element={<SetupProfessional />} />

        {/* Company Profile */}
        <Route path="company-myprofile">
          <Route index element={<CompanyMyProfile />} />
          <Route path="edit" element={<CompanyEditProfile />} />
        </Route>

        {/* Professional Profile */}
        <Route path="professional-myprofile">
          <Route index element={<ProfessionalMyProfile />} />
          <Route path="edit" element={<ProfessionalEditProfile />} />
        </Route>

        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="create-project" element={<CreateProject />} />
      </Route>
    </Routes>
  )
}

export default App
