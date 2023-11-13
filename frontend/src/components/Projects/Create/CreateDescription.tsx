import React, { useContext } from "react"
import CreateProjectContext from "./CreateProjectContext"

const CreateDescription: React.FC = () => {
  const projContext = useContext(CreateProjectContext)

  const projData = projContext[0]
  const setProj = projContext[1]

  return (
    <div className="flex w-full h-full pt-10 px-4 md:items-center md:justify-center md:pt-0 md:px-20">
      <div className="flex flex-col gap-8 md:flex-row w-full max-w-[800px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold text-sky-200">
            Start the conversation.
          </h1>
          <div className="flex flex-col gap-4">
            <div>
              <h3>Public descriptions should include:</h3>
              <ul className="list-disc pl-8 text-zinc-400 font-thin">
                <li>Details of the project</li>
                <li>Expected start date and timeframe</li>
                <li>Payment methods and amounts</li>
              </ul>
            </div>
            <div>
              <h3>Private descriptions should include:</h3>
              <ul className="list-disc pl-8 text-zinc-400 font-thin">
                <li>
                  Anything that you don&apos;t want the general public to see
                </li>
                <li>
                  Anything that you want to tell the professionals that got
                  accepted
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-lg">
              Add public description for your project!
            </h3>
            <textarea
              className="bg-transparent border border-zinc-400 rounded-md w-full h-[150px] p-2"
              placeholder="Add a public description"
              value={projData.publicDescription}
              onChange={e =>
                setProj("publicDescription", e.currentTarget.value)
              }
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <h3 className="text-lg">
              Add private description for your project!
            </h3>
            <textarea
              className="bg-transparent border border-zinc-400 rounded-md w-full h-[150px] p-2"
              placeholder="Add a private description"
              value={projData.privateDescription}
              onChange={e =>
                setProj("privateDescription", e.currentTarget.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateDescription
