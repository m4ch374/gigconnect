// An atomic component used by setup qualifications and external links
import ArrowUpDown from "assets/icons/ArrowsUpDown"
import Cross from "assets/icons/Cross"
import React from "react"
import { ExternalLink } from "types/general.types"

const LinkItem: React.FC<{
  item: ExternalLink
  removeAt: (idx: number) => void
  currIdx: number
}> = ({ item, removeAt, currIdx }) => {
  return (
    <div className="border border-zinc-400 rounded-md p-2 flex justify-between bg-stone-600 cursor-grab">
      <div className="flex items-center">
        <div className="px-2 mr-2 border-r border-zinc-400 h-full flex items-center text-zinc-400">
          <ArrowUpDown />
        </div>
        <div>
          <h1 className="font-semibold text-xl">{item.websiteName}</h1>
          <a className="text-sky-500 underline" href={item.websiteLink}>
            {item.websiteLink}
          </a>
        </div>
      </div>
      <button
        className="border-l border-zinc-500 pl-2 text-zinc-400 hover:text-zinc-200"
        onClick={() => removeAt(currIdx)}
      >
        <Cross className="h-8 w-8" />
      </button>
    </div>
  )
}

export default LinkItem
