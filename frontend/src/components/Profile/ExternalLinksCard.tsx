import React from "react"
import { ExternalLink } from "types/general.types"

const ExternalLinksCard: React.FC<{ item: ExternalLink }> = ({ item }) => {
  const { websiteName, websiteLink } = item

  return (
    <div className="rounded full px-4 py-2 border border-zinc-400/20 hover:bg-sky-400/20 hover:border-zinc-400/0 transition-all">
      <h1 className="text-lg font-bold">{websiteName}</h1>
      <a href={websiteLink} className="text-sky-500 underline">
        {websiteLink}
      </a>
    </div>
  )
}

export default ExternalLinksCard
