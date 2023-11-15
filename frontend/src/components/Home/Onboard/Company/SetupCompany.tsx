import ModalBackdrop from "components/ModalBackdrop"
import useDisableScroll from "hooks/DisableScroll"
import React, { Dispatch, SetStateAction, useCallback } from "react"
import ProfileSetupContainer from "../ProfileSetupContainer"
import useSteps, { StepContext } from "hooks/Steps.hooks"
import SetupDescription from "../SetupDescription"
import SetupExternalLinks from "../SetupExternalLinks"
import FinishSetup from "../FinishSetup"
import useObject from "hooks/UseObject.hooks"
import { CompanyProfileData } from "types/company.types"
import CompanySetupContext from "../../../Profile/Company/CompanyProfileContext"
import { putOnboarded } from "services/auth.services"

type TSetupCompany = {
  setShow: Dispatch<SetStateAction<boolean>>
}

const MAX_STEP = 2

const SetupCompany: React.FC<TSetupCompany> = ({ setShow }) => {
  useDisableScroll()

  const stepController = useSteps(MAX_STEP)
  const currStep = stepController.step

  const setupValues = useObject<CompanyProfileData>({
    abn: "",
    companyDescription: "",
    companyName: "",
    externalWebsites: [],
    profilePhoto: "",
    projects: [],
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
      <CompanySetupContext.Provider value={setupValues}>
        <StepContext.Provider value={stepController}>
          <ProfileSetupContainer
            onCloseButton={onModalClose}
            currStep={currStep}
            maxStep={MAX_STEP}
          >
            {currStep === 0 ? (
              <SetupDescription />
            ) : currStep === 1 ? (
              <SetupExternalLinks />
            ) : (
              <FinishSetup />
            )}
          </ProfileSetupContainer>
        </StepContext.Provider>
      </CompanySetupContext.Provider>
    </ModalBackdrop>
  )
}

export default SetupCompany
