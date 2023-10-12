import React, { useState } from "react"

const CompanyEditProfile: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formError, updateFormError] = useState()

  return (
    <div className="w-11/12 sm:w-[600px] mx-auto">
      <h1 className="text-2xl sm:text-4xl font-bold pt-6 text-center">
        Edit My Profile
      </h1>
      <form className="text-left">
        <label htmlFor="company-name" className="block pt-4 pb-2">
          Company name
        </label>
        <input
          type="text"
          id="company-name"
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
        />

        <label htmlFor="description" className="block pt-4 pb-2">
          Description
        </label>
        <textarea
          id="description"
          className="block w-full p-2 bg-cyan-200 hover:bg-cyan-100 focus:bg-cyan-100 rounded-md drop-shadow-md"
        ></textarea>

        {/* 
        The following will not be part of sprint 1 due to issues on the backend.

        <div className="block pt-4 pb-2">External websites</div>
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

        */}

        <button
          type="submit"
          className="block w-full mt-8 p-2 bg-cyan-400 hover:bg-cyan-300 text-center rounded-md drop-shadow-md"
        >
          Save changes
        </button>
        {formError && (
          <div className=" w-full my-4 p-2 bg-red-300 border border-red-500 rounded-md">
            <p>{formError}</p>
          </div>
        )}
      </form>
    </div>
  )
}

export default CompanyEditProfile
