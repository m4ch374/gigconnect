import React, { useEffect, useMemo } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Login from "pages/Auth/Login"
import ProtectedRoutes from "components/ProtectedRoutes"
import CompanyMyProfile from "pages/Profile/Company/CompanyMyProfile"
import ProfessionalMyProfile from "pages/Profile/Professional/ProfessionalMyProfile"
import AdminDashboard from "pages/AdminDashboard"
import CompanyEditProfile from "pages/Profile/Company/CompanyEditProfile"
import ProfessionalEditProfile from "pages/Profile/Professional/ProfessionalEditProfile"
import CreateProject from "pages/Projects/CreateProject"
import RequestProject from "pages/Projects/RequestProject"
import Home from "pages/Home/Home"
import Landing from "pages/Landing"
import ProjectDetails from "pages/Projects/ProjectDetails"
import RequestRespond from "pages/Projects/RequestRespond"
import EditProject from "pages/Projects/EditProject"
import ProfessionalProfile from "pages/Profile/Professional/ProfessionalProfile"
import useToken from "hooks/Token.hooks"
import PreSignUp from "pages/Auth/PreSignUp"
import SignUpProfessional from "pages/Auth/SignUpProfessional"
import SignUpCompany from "pages/Auth/SignUpCompany"
import Projects from "pages/Home/Projects"
import Companies from "pages/Home/Companies"
import Talents from "pages/Home/Talents"
import { AnimatePresence } from "framer-motion"
import CompanyProfile from "pages/Profile/Company/CompanyProfile"

const AppRoutes: React.FC = () => {
  const token = useToken().token

  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname.split("/"))
  }, [location])

  // TODO: fix issue with rerendering parents
  // NOTE: issue happnes bc of keys
  // Current band-aid fix
  const routeKey = useMemo(() => {
    const splitted = location.pathname.split("/")

    const targetRouteFragment = ["details"]
    const contains = targetRouteFragment.some(frag => splitted.includes(frag))

    return contains ? location.key : undefined
  }, [location.key, location.pathname])

  // Define routes for pages on the web app.
  return (
    <AnimatePresence>
      <Routes location={location} key={routeKey}>
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
        <Route
          index
          element={!token ? <Landing /> : <Navigate to={"/home"} />}
        />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="home" element={<Home />}>
            <Route index element={<Projects />} />
            <Route path="projects" element={<Projects />}>
              <Route path="details/:projectId" element={<ProjectDetails />} />
            </Route>
            <Route path="companies" element={<Companies />} />
            <Route path="talents" element={<Talents />} />
          </Route>

          {/* Company Profile */}
          <Route path="company">
            <Route index element={<CompanyMyProfile />} />
            <Route path="edit" element={<CompanyEditProfile />} />
            <Route path=":userId" element={<CompanyProfile />} />
          </Route>

          {/* Professional Profile */}
          <Route path="professional">
            <Route index element={<ProfessionalMyProfile />} />
            <Route path="edit" element={<ProfessionalEditProfile />} />
            <Route path=":userId" element={<ProfessionalProfile />} />
          </Route>

          {/* Dumps */}
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="project/:projectId/edit" element={<EditProject />} />
          <Route
            path="project-request/:projectId"
            element={<RequestProject />}
          />
          <Route
            path="project/:projectId/request/:requestId"
            element={<RequestRespond />}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default AppRoutes
