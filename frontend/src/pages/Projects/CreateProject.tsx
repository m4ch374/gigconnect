import React, { useMemo } from "react"
import useWindowDimensions from "hooks/WindowDimensions"
import CreateStatusBar from "components/Projects/Create/CreateStatusBar"
import useSteps from "hooks/Steps.hooks"
import CreateFinished from "components/Projects/Create/CreateFinished"
import CreateTitle from "components/Projects/Create/CreateTitle"
import CreateKeywords from "components/Projects/Create/CreateKeyowrds"
import CreateProjectContext from "components/Projects/Create/CreateProjectContext"
import useObject from "hooks/UseObject.hooks"
import { CreateProjectData } from "types/project.types"
import CreateLocation from "components/Projects/Create/CreateLocatoin"
import CreateDescription from "components/Projects/Create/CreateDescription"

const MAX_STEPS = 4

const CreateProject: React.FC = () => {
  const { height } = useWindowDimensions()
  const screenHeight = useMemo(() => height - 70, [height])

  const stepsController = useSteps(MAX_STEPS)
  const { step } = stepsController

  const createProjectController = useObject<CreateProjectData>({
    inPerson: false,
    location: "",
    privateDescription: "",
    publicDescription: "",
    tags: [],
    title: "",
  })

  return (
    <CreateProjectContext.Provider value={createProjectController}>
      <div className="flex flex-col w-full" style={{ height: screenHeight }}>
        <div className="w-full h-full">
          {step === 0 ? (
            <CreateTitle />
          ) : step === 1 ? (
            <CreateKeywords />
          ) : step === 2 ? (
            <CreateLocation />
          ) : step === 3 ? (
            <CreateDescription />
          ) : (
            <CreateFinished />
          )}
        </div>
        <div className="w-full justify-items-end">
          <CreateStatusBar
            onContinueClick={stepsController.incrementStep}
            onBackClick={stepsController.decrementStep}
            currStep={step}
            maxStep={MAX_STEPS}
          />
        </div>
      </div>
    </CreateProjectContext.Provider>
  )
}
export default CreateProject
