// Shows the description of a profile
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import ProfessionalProfileContext from "./Professional/ProfessionalProfileContext"
import CompanyProfileContext from "./Company/CompanyProfileContext"
import useIsMyProfile from "hooks/UseIsMyProfile"
import ProfileEditButton from "./Edit/ProfileEditButton"
import ProfileEditContainer from "./Edit/ProfileEditContainer"
import { AnimatePresence } from "framer-motion"
import EditDescription from "./Edit/EditDescription"
import { updateProfessionalProfile } from "services/professional.services"
import toast from "react-hot-toast"
import { updateCompanyProfile } from "services/company.services"
import useUserType from "hooks/UserType.hooks"
import MultiLine from "components/MultiLine"

const ProfileDescription: React.FC = () => {
  const isMyProfile = useIsMyProfile()
  const { userType } = useUserType()

  const professionalProfileContext = useContext(ProfessionalProfileContext)
  const companyProfileContext = useContext(CompanyProfileContext)

  const description = useMemo(() => {
    const proDesc = professionalProfileContext[0].description
    const compDesc = companyProfileContext[0].companyDescription

    return proDesc || compDesc
  }, [companyProfileContext, professionalProfileContext])

  const cappedDescription = useMemo(() => {
    const capped = description.substring(0, 500)

    return capped.length < description.length ? `${capped} ... ` : capped
  }, [description])

  const [showMore, setShowMore] = useState(false)

  const [editModal, setEditModal] = useState(false)
  const [editItem, setEditItem] = useState(description)

  useEffect(() => {
    setEditItem(description)
  }, [description])

  const editProfessionalDescription = useCallback(() => {
    ;(async () => {
      const resp = await updateProfessionalProfile({
        ...professionalProfileContext[0],
        description: editItem,
      })

      if (!resp.ok) {
        toast.error(resp.error)
        return
      }

      professionalProfileContext[1]("description", editItem)
      setEditModal(false)
    })()
  }, [editItem, professionalProfileContext])

  const editCompanyDescription = useCallback(() => {
    ;(async () => {
      const resp = await updateCompanyProfile({
        ...companyProfileContext[0],
        companyDescription: editItem,
      })

      if (!resp.ok) {
        toast.error(resp.error)
        return
      }

      companyProfileContext[1]("companyDescription", editItem)
      setEditModal(false)
    })()
  }, [companyProfileContext, editItem])

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center">
        <h3 className="font-semibold text-2xl">Description</h3>
        {isMyProfile && (
          <ProfileEditButton onButtonClick={() => setEditModal(true)} />
        )}
      </div>
      <div className="p-4 font-thin">
        {description ? (
          <>
            {showMore ? (
              <MultiLine text={description} />
            ) : (
              <MultiLine text={cappedDescription} />
            )}
            <p>
              {cappedDescription.length < description.length && (
                <button
                  className="font-bold text-sky-400 underline"
                  onClick={() => setShowMore(s => !s)}
                >
                  {showMore ? "less" : "more"}
                </button>
              )}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <img src="/Trip.svg" className="w-40 h-40" />
            <h3 className="font-semibold text-xl">No Description Provided</h3>
          </div>
        )}
      </div>

      <AnimatePresence>
        {editModal && (
          <ProfileEditContainer
            onCloseButton={() => setEditModal(false)}
            onBackdropClick={() => setEditModal(false)}
            containerTitle="Edit Description"
            onConfirmClick={() => {
              if (userType === "professional") {
                editProfessionalDescription()
                return
              }
              editCompanyDescription()
            }}
          >
            <div className="px-4 pt-4">
              <h1>Change your description:</h1>
              <EditDescription
                textValue={editItem}
                textOnChange={e => setEditItem(e.currentTarget.value)}
              />
            </div>
          </ProfileEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileDescription
