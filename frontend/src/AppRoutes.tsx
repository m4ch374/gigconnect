import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "pages/Auth/Login"
import ProtectedRoutes from "components/ProtectedRoutes"
import CompanyMyProfile from "pages/CompanyMyProfile"
import ProfessionalMyProfile from "pages/ProfessionalMyProfile"
import AdminDashboard from "pages/AdminDashboard"
import SetupCompany from "pages/SetupCompany"
import SetupProfessional from "pages/SetupProfessional"
import CompanyEditProfile from "pages/CompanyEditProfile"
import ProfessionalEditProfile from "pages/ProfessionalEditProfile"
import CreateProject from "pages/CreateProject"
import RequestProject from "pages/RequestProject"
import Home from "pages/Home"
import Landing from "pages/Landing"
import ProjectDetails from "pages/ProjectDetails"
import RequestRespond from "pages/RequestRespond"
import EditProject from "pages/EditProject"
import ProfessionalProfile from "pages/ProfessionalProfile"
import ProjectDetailsCompany from "pages/ProjectDetailsCompany"
import useToken from "hooks/Token.hooks"
import PreSignUp from "pages/Auth/PreSignUp"
import SignUpProfessional from "pages/Auth/SignUpProfessional"
import SignUpCompany from "pages/Auth/SignUpCompany"

const AppRoutes: React.FC = () => {
  const token = useToken().token

  return (
    <Routes>
      {/* Auth */}
      {!token && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up">
            <Route index element={<PreSignUp />} />
            <Route path="company" element={<SignUpCompany />} />
            <Route path="professional" element={<SignUpProfessional />} />
          </Route>
        </>
      )}

      {/* Main */}
      <Route index element={<Landing />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="home" element={<Home />}>
          <Route path="details/:projectId" element={<ProjectDetails />} />
        </Route>
        <Route path="setup-company" element={<SetupCompany />} />
        <Route path="setup-professional" element={<SetupProfessional />} />

        {/* Company Profile */}
        <Route path="company-myprofile" element={<CompanyMyProfile />}>
          <Route
            path="details/:projectId"
            element={<ProjectDetailsCompany />}
          />
        </Route>
        <Route path="company-myprofile/edit" element={<CompanyEditProfile />} />

        {/* Professional Profile */}
        <Route path="professional-myprofile">
          <Route index element={<ProfessionalMyProfile />} />
          <Route path="edit" element={<ProfessionalEditProfile />} />
        </Route>

        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="create-project" element={<CreateProject />} />
        <Route path="project/:projectId/edit" element={<EditProject />} />
        <Route path="project-request/:projectId" element={<RequestProject />} />
        <Route
          path="project/:projectId/request/:requestId"
          element={<RequestRespond />}
        />
        <Route path="professional/:userId" element={<ProfessionalProfile />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
