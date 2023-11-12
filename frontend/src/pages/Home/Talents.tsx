import React, { useEffect, useState } from "react"
import { getAllProfessionals } from "services/professional.services"
import { ProfessionalUser } from "types/professional.types"
import TalentPreview from "../../components/Home/TalentPreview"
import { useOutletContext } from "react-router-dom"

const Talents: React.FC = () => {
  const searches = useOutletContext()
  const [talents, setTalents] = useState<ProfessionalUser[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAllProfessionals()

      if (!resp.ok) return undefined

      setTalents(resp.data.professionalUsers)
    })()
  }, [])

  return (
    <div>
      {talents
        .filter(talent =>
          (talent.firstName + " " + talent.lastName).includes(
            searches as string,
          ),
        )
        .map((talent, idx) => {
          return (
            <div key={idx}>
              <TalentPreview talent={talent} />
              <hr className="border-zinc-400" />
            </div>
          )
        })}
    </div>
  )
}

export default Talents
