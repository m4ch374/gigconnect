// Last page of creating project flow
import React, { useCallback, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import CheckCircle from "assets/icons/CheckCircle"
import { apiCreateProject } from "services/project.services"
import CreateProjectContext from "./CreateProjectContext"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import useDisableScroll from "hooks/DisableScroll"

const CreateFinished: React.FC = () => {
  useDisableScroll()

  const createData = useContext(CreateProjectContext)[0]
  const navigate = useNavigate()

  const createProject = useCallback(() => {
    ;(async () => {
      const resp = await apiCreateProject(createData)

      if (!resp.ok) {
        toast.error(resp.error)
        navigate("/home/projects")
      }
    })()
  }, [createData, navigate])

  // To prevent double project creation due to strict mode
  useEffect(() => {
    const timeout = setTimeout(() => {
      createProject()
    }, 10)

    return () => clearTimeout(timeout)
  }, [createProject])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{
            rotate: 360,
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 7,
              stiffness: 100,
            },
          }}
        >
          <CheckCircle className="w-40 h-40 text-green-400" />
        </motion.div>

        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-4xl font-bold">Congrats!</h1>
          <h3 className="font-thin">You have created a project!</h3>
        </div>
      </div>
    </div>
  )
}

export default CreateFinished
