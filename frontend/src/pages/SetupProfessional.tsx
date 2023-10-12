import React, { useState } from "react"

const SetupProfessional: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formError, updateFormError] = useState()

  return (
    <div className="w-11/12 sm:w-[600px] mx-auto">
      <h1 className="text-2xl sm:text-4xl font-bold pt-6 text-center">
        Profile Setup
      </h1>
      <p>Add some details to your profile to help others find you!</p>
      <form className="text-left">
        <label htmlFor="description" className="block pt-4 pb-2">
          Description
        </label>
        <textarea
          id="description"
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
        ></textarea>
        <div className="block pt-4 pb-2">Skills</div>
        {/* Map this div for each skill */}
        <div className="flex space-x-1 mb-2">
          <input
            type="text"
            className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
            placeholder="Type a skill here..."
          />
          <button
            type="button"
            className="block p-2 bg-red-400 hover:bg-red-300 text-center rounded-md drop-shadow-md"
          >
            Remove
          </button>
        </div>
        <button
          type="button"
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 text-center rounded-md drop-shadow-md"
        >
          Add a skill
        </button>

        <div className="block pt-4 pb-2">Qualifications</div>
        {/* Map this div for each qualification */}
        <div className="flex space-x-1 mb-2">
          <input
            type="text"
            className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
            placeholder="Qualification name"
          />
          <input
            type="text"
            className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
            placeholder="Link to qualification"
          />
          <button className="block p-2 bg-red-400 hover:bg-red-300 text-center rounded-md drop-shadow-md">
            Remove
          </button>
        </div>
        <button
          type="button"
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 text-center rounded-md drop-shadow-md"
        >
          Add a qualificaiton
        </button>

        <div className="block pt-4 pb-2">External websites</div>
        {/* Map this div for each external website */}
        <div className="flex space-x-1 mb-2">
          <input
            type="text"
            className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
            placeholder="Website name"
          />
          <input
            type="text"
            className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
            placeholder="Website link"
          />
          <button className="block p-2 bg-red-400 hover:bg-red-300 text-center rounded-md drop-shadow-md">
            Remove
          </button>
        </div>
        <button
          type="button"
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 text-center rounded-md drop-shadow-md"
        >
          Add an external website
        </button>

        <div className="flex space-x-1">
          <button
            type="button"
            className="block w-full mt-8 p-2 border border-cyan-600 hover:bg-cyan-100 text-cyan-600 text-center rounded-md"
          >
            Skip
          </button>
          <button
            type="submit"
            className="block w-full mt-8 p-2 bg-cyan-400 hover:bg-cyan-300 text-center rounded-md drop-shadow-md"
          >
            Save
          </button>
        </div>

        {formError && (
          <div className=" w-full my-4 p-2 bg-red-300 border border-red-500 rounded-md">
            <p>{formError}</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default SetupProfessional
