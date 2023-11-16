import React from "react"
import HoverSkewImage from "./HoverSkewImage"

const CompanyBenefits: React.FC = () => {
  return (
    <div className="w-full overflow-x-clip py-14 flex justify-center bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-600">
      <div className="w-[90%] max-w-[1000px]">
        <div className="flex flex-col gap-10 lg:flex-row-reverse">
          <div className="flex flex-col gap-10 relative z-10">
            <h1 className="text-[3rem] leading-[3rem] font-bold">
              Cutting costs, for all the right reasons!
            </h1>
            <h3 className="text-2xl text-zinc-400">
              Digging up the hard working, enthusiastic and under-valued talents
              for your projects.
            </h3>
          </div>
          <HoverSkewImage
            src="/showcase2.png"
            className="drop-shadow-glow-blue border-2 border-zinc-200/20"
          />
        </div>

        <div className="p-4 pb-16 w-full mt-10 text-xl rounded-lg backdrop-blur-lg bg-gradient-to-r from-indigo-200/60 via-red-200/60 to-yellow-100/60">
          <h3>Register as Company user to:</h3>
          <ul className="list-disc p-4 px-8">
            <li>Host interesting and exciting projects.</li>
            <li>Find the top 1% talents.</li>
            <li>
              Cut down cost because talents are very desperate so you could
              under pay them!
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CompanyBenefits
