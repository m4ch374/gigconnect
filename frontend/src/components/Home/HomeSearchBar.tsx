// General purpose search bar, used in home page
import Magnifier from "assets/icons/Magnifier"
import React, { Dispatch, SetStateAction, useState } from "react"

type THomeSearchBar = {
  searchController: [string, Dispatch<SetStateAction<string>>]
}

const HomeSearchBar: React.FC<THomeSearchBar> = ({ searchController }) => {
  const [search, setSearch] = searchController
  const [currSearch, setCurrSearch] = useState(search)

  return (
    <div className="w-full gap-0 flex">
      <input
        type="text"
        placeholder="Start Searching!"
        className="p-2
          w-full
          bg-zinc-700
          rounded-l-md
          font-thin
          text-sm
          outline-none
          border
          border-r-0
          border-zinc-500
          focus:border-gray-200
          transition-colors
          peer
        "
        onChange={e => {
          if (e.currentTarget.value === "") setSearch("")
          setCurrSearch(e.currentTarget.value)
        }}
      />
      <button
        className="
          px-2.5
          bg-sky-600
          rounded-r-md
          border
          border-l-0
          border-zinc-500
          peer-focus:border-gray-200
          transition-colors
        "
        onClick={() => setSearch(currSearch)}
      >
        <Magnifier />
      </button>
    </div>
  )
}

export default HomeSearchBar
