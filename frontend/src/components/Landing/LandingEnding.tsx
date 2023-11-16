// Last section of the landing page
import React from "react"
import { Link } from "react-router-dom"

type TGridItem = {
  imgSrc: string
  text: string
}

const GridItem: React.FC<TGridItem> = ({ imgSrc, text }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={imgSrc} className="max-w-[300px] aspect-square" />
      <h3 className="text-2xl font-bold text-center">{text}</h3>
    </div>
  )
}

const LandingEnding: React.FC = () => {
  return (
    <div className="w-full flex justify-center bg-gradient-to-b from-blue-300 to-slate-800">
      <div className="w-[90%] max-w-[1000px] flex flex-col items-center">
        <h3 className="text-3xl font-semibold">
          It is all about having a choice.
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4">
          <GridItem
            imgSrc="Select_Box.svg"
            text="A choice to choose the company."
          />
          <GridItem
            imgSrc="Relax.svg"
            text="A choice to choose when to work."
          />
          <GridItem
            imgSrc="Engineering_Team.svg"
            text="A choice to choose the best of the best."
          />
          <GridItem imgSrc="Trip.svg" text="A choice to live your life." />
        </div>
        <div className="mt-20 mb-10 flex flex-col items-center gap-8">
          <h1 className="text-[3rem] font-thin">Stuck in a 9 to 5?</h1>
          <Link
            to={"/login"}
            className="px-4 py-1 text-2xl hover:bg-sky-500 bg-sky-400 text-sky-100 rounded-full"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingEnding
