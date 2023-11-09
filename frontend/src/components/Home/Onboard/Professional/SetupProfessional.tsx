import ModalBackdrop from "components/ModalBackdrop"
import useDisableScroll from "hooks/DisableScroll"
import React, { Dispatch, SetStateAction, useCallback } from "react"
import ProfileSetupContainer from "../ProfileSetupContainer"
import useSteps, { StepContext } from "hooks/Steps.hooks"
import SetupDescription from "../SetupDescription"
import SetupSkills from "./SetupSkills"
import FinishSetup from "../FinishSetup"
import ProfessionalSetupContext from "./ProfessionalSetupContext"
import useObject from "hooks/UseObject.hooks"
import { ProfessionalProfileData } from "types/professional.types"
import SetupQualifications from "./SetupQualifications"
import SetupExternalLinks from "../SetupExternalLinks"
import { putOnboarded } from "services/auth.services"

type TSetupProfessional = {
  setShow: Dispatch<SetStateAction<boolean>>
}

const SetupProfessional: React.FC<TSetupProfessional> = ({ setShow }) => {
  useDisableScroll()

  const stepController = useSteps(4)
  const currStep = stepController.step

  const setupValues = useObject<ProfessionalProfileData>({
    description: "",
    externalWebsites: [],
    firstName: "",
    lastName: "",
    profilePhoto: "",
    projects: [],
    qualifications: [],
    skills: [],
    verified: false,
  })

  const onModalClose = useCallback(() => {
    ;(async () => {
      await putOnboarded()
    })()
    setShow(false)
  }, [setShow])

  return (
    <ModalBackdrop
      className="flex items-center justify-center"
      onBackdropClick={onModalClose}
    >
      <ProfessionalSetupContext.Provider value={setupValues}>
        <StepContext.Provider value={stepController}>
          <ProfileSetupContainer onCloseButton={onModalClose}>
            {currStep === 0 ? (
              <SetupDescription />
            ) : currStep === 1 ? (
              <SetupSkills />
            ) : currStep === 2 ? (
              <SetupQualifications />
            ) : currStep === 3 ? (
              <SetupExternalLinks />
            ) : (
              <FinishSetup />
            )}
          </ProfileSetupContainer>
        </StepContext.Provider>
      </ProfessionalSetupContext.Provider>
    </ModalBackdrop>
  )
}

export default SetupProfessional
