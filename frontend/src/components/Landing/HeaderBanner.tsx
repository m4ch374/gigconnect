import React from "react"
import { Link } from "react-router-dom"

const HeaderBanner: React.FC = () => {
  return (
    <div className="w-[90%] max-w-[1000px] mt-[80px]">
      <div className="flex gap-4 flex-wrap md:flex-1 md:flex-nowrap justify-center md:items-center">
        <img
          src="/Trip.svg"
          className="w-[50%] aspect-square drop-shadow-glow-blue"
        />
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-[3rem] text-sky-300 my-10 leading-[3rem]">
            Ditching that annoying 9 to 5 job.
          </h1>
          <h3 className="text-2xl">
            Making work more accessible, making you more free.
          </h3>
          <Link
            to={"/login"}
            className="bg-sky-400 rounded-full text-sky-100 px-4 py-1 place-self-start hover:bg-sky-500"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeaderBanner
