import React, { useEffect, useState } from "react"
import { getAllProfessionals } from "services/professional.services"
import { ProfessionalUser } from "types/professional.types"
import TalentPreview from "./TalentPreview"

type TTalents = {
  searches: string
}

const Talents: React.FC<TTalents> = ({ searches }) => {
  const [talents, setTalents] = useState<ProfessionalUser[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAllProfessionals()

      if (typeof resp === "undefined") return undefined

      setTalents(resp.professionalUsers)
    })()
  }, [])

  return (
    <div>
      {talents
        .filter(talent =>
          (talent.firstName + " " + talent.lastName).includes(searches),
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
