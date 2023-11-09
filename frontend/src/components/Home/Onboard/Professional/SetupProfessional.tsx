import ModalBackdrop from "components/ModalBackdrop"
import useDisableScroll from "hooks/DisableScroll"
import React, { Dispatch, SetStateAction } from "react"
import ProfileSetupContainer from "../ProfileSetupContainer"
import useSteps, { StepContext } from "hooks/Steps.hooks"
import SetupDescription from "./SetupDescription"
import SetupSkills from "./SetupSkills"
import SetupLinks from "./SetupLinks"
import FinishSetup from "../FinishSetup"

type TSetupProfessional = {
  setShow: Dispatch<SetStateAction<boolean>>
}

const SetupProfessional: React.FC<TSetupProfessional> = ({ setShow }) => {
  useDisableScroll()

  const stepController = useSteps(4)
  const currStep = stepController.step

  return (
    <ModalBackdrop
      className="flex items-center justify-center"
      onBackdropClick={() => setShow(false)}
    >
      <StepContext.Provider value={stepController}>
        <ProfileSetupContainer onCloseButton={() => setShow(false)}>
          {currStep === 0 ? (
            <SetupDescription />
          ) : currStep === 1 ? (
            <SetupSkills />
          ) : currStep === 2 || currStep === 3 ? (
            <SetupLinks />
          ) : (
            <FinishSetup />
          )}
        </ProfileSetupContainer>
      </StepContext.Provider>
    </ModalBackdrop>
  )
}

export default SetupProfessional
