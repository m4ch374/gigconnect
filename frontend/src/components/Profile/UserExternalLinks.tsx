// Shows external links for both professional and company users
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import ExternalLinksCard from "./ExternalLinksCard"
import ProfessionalProfileContext from "./Professional/ProfessionalProfileContext"
import CompanyProfileContext from "./Company/CompanyProfileContext"
import { AnimatePresence } from "framer-motion"
import ProfileEditContainer from "./Edit/ProfileEditContainer"
import EditLinksTemplate from "./Edit/EditLinksTemplate"
import useArray from "hooks/UseArray.hooks"
import { ExternalLink } from "types/general.types"
import useIsMyProfile from "hooks/UseIsMyProfile"
import ProfileEditButton from "./Edit/ProfileEditButton"
import { updateProfessionalProfile } from "services/professional.services"
import toast from "react-hot-toast"
import { updateCompanyProfile } from "services/company.services"
import useUserType from "hooks/UserType.hooks"

const UserExternalLinks: React.FC = () => {
  const isMyProfile = useIsMyProfile()
  const { userType } = useUserType()

  const professionalProfileController = useContext(ProfessionalProfileContext)
  const companyProfileController = useContext(CompanyProfileContext)

  const externalWebsites = useMemo(() => {
    const proExtern = professionalProfileController[0].externalWebsites
    const compExtern = companyProfileController[0].externalWebsites

    return proExtern.length === 0 ? compExtern : proExtern
  }, [companyProfileController, professionalProfileController])

  const [editModal, setEditModal] = useState(false)
  const externalLinksController = useArray<ExternalLink>(externalWebsites)

  useEffect(() => {
    externalLinksController.setArr(externalWebsites)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalWebsites, externalLinksController.setArr])

  const editProfessional = useCallback(() => {
    ;(async () => {
      const resp = await updateProfessionalProfile({
        ...professionalProfileController[0],
        externalWebsites: externalLinksController.arr,
      })

      if (!resp.ok) {
        toast.error(resp.error)
        return
      }

      professionalProfileController[1](
        "externalWebsites",
        externalLinksController.arr,
      )
      setEditModal(false)
    })()
  }, [externalLinksController.arr, professionalProfileController])

  const editCompany = useCallback(() => {
    ;(async () => {
      const resp = await updateCompanyProfile({
        ...companyProfileController[0],
        externalWebsites: externalLinksController.arr,
      })

      if (!resp.ok) {
        toast.error(resp.error)
        return
      }

      companyProfileController[1](
        "externalWebsites",
        externalLinksController.arr,
      )
      setEditModal(false)
    })()
  }, [companyProfileController, externalLinksController.arr])

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center">
        <h1 className="font-semibold text-2xl">External Websites</h1>
        {isMyProfile && (
          <ProfileEditButton onButtonClick={() => setEditModal(true)} />
        )}
      </div>
      {externalWebsites.length === 0 ? (
        <div className="flex flex-col items-center w-full">
          <img src="/Select_Box.svg" className="w-40 h-40" />
          <h3 className="font-semibold text-xl">
            No External Websites Provided
          </h3>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-4">
          {externalWebsites.map((site, idx) => (
            <ExternalLinksCard key={idx} item={site} />
          ))}
        </div>
      )}

      <AnimatePresence>
        {editModal && (
          <ProfileEditContainer
            onCloseButton={() => setEditModal(false)}
            onBackdropClick={() => setEditModal(false)}
            containerTitle="Add or remove external links"
            onConfirmClick={() => {
              if (userType === "professional") {
                editProfessional()
                return
              }
              editCompany()
            }}
          >
            <div className="px-4 pt-4 overflow-auto">
              <h1>Change your description:</h1>
              <EditLinksTemplate
                inputLinkPlaceholder="Website"
                inputNamePlaceholder="Website Name"
                arrayController={externalLinksController}
              />
            </div>
          </ProfileEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserExternalLinks
