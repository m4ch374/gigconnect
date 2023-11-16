import React from "react"
import HoverSkewImage from "./HoverSkewImage"

const ProductIntro: React.FC = () => {
  return (
    <div className="overflow-hidden flex justify-center w-full bg-violet-500 bg-gradient-to-b py-10 from-violet-500 via-indigo-500 to-sky-300">
      <div className="w-[90%] max-w-[1000px]">
        <div className="flex flex-col gap-10 lg:flex-row lg:flex-1">
          <div className="flex flex-col gap-10 relative z-10">
            <h1 className="text-[3rem] font-bold text-zinc-100/90 leading-[3rem]">
              Find good company, with good companies.
            </h1>
            <h3 className="text-2xl text-zinc-200/80">
              Search for projects that you love, hosted by companies that you
              like.
            </h3>
          </div>
          <HoverSkewImage src="/showcase1.png" />
        </div>
        <div className="text-xl mt-10 text-zinc-100 backdrop-blur-lg rounded-md p-4 bg-gradient-to-b from-gray-900/50 to-gray-600/80">
          <h3>Register as Professional user to:</h3>
          <ul className="list-disc p-4 pl-8 text-lg">
            <li>Find projects you like.</li>
            <li>Apply to projects which you find interesting.</li>
            <li>Browse other companies and professionals on the site.</li>
            <li>Live the life you want!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductIntro
