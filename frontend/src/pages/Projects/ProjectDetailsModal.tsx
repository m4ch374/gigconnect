import React from "react"
import { useParams } from "react-router-dom"
import ProjectDetails from "./ProjectDetails"
import HeavyModalTemplate from "components/HeavyModalTemplate"

const ProjectDetailsModal: React.FC = () => {
  const { projectId } = useParams()

  return (
    <HeavyModalTemplate newTabLink={`/project/${projectId}`}>
      <ProjectDetails useFullWidth={true} />
    </HeavyModalTemplate>
  )
}

export default ProjectDetailsModal
