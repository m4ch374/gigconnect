import Building from "assets/icons/Building"
import CheveronLeft from "assets/icons/CheveronLeft"
import Clipboard from "assets/icons/Clipboard"
import MapPin from "assets/icons/MapPin"
import TalentPreview from "components/Home/TalentPreview"
import ModalBackdrop from "components/ModalBackdrop"
import useDisableScroll from "hooks/DisableScroll"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProjectDetailsProfessional } from "services/project.services"
import { TProjDetailsProfessional } from "services/types"
import { ProfessionalUser } from "types/professional.types"
import { Variants, motion } from "framer-motion"
import useWindowDimensions from "hooks/WindowDimensions"

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()

  useDisableScroll()

  const [projDetail, setProjDetail] =
    useState<TProjDetailsProfessional["responseType"]>()

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (!projectId) return
    ;(async () => {
      const res = await getProjectDetailsProfessional({ projectId })

      if (!res.ok) {
        toast.error(res.error)
        return
      }

      setProjDetail(res.data)
    })()
  }, [projectId])

  // Cheating a lil bit
  if (typeof projDetail === "undefined") return <></>

  const variants: Variants = {
    enter: () => {
      if (width < 640) {
        return { y: 1000 }
      }
      return { x: 1000 }
    },
    finish: {
      x: 0,
      y: 0,
      transition: { ease: "circOut", type: "tween", duration: 0.4 },
    },
    exit: () => {
      if (width < 640) {
        return {
          y: 1000,
          transition: { ease: "easeIn", type: "tween", duration: 0.4 },
        }
      }
      return {
        x: 1000,
        transition: { ease: "easeIn", type: "tween", duration: 0.4 },
      }
    },
  }

  return (
    <ModalBackdrop
      onBackdropClick={() => navigate(-1)}
      className="flex justify-end items-end w-full pt-10 sm:pt-0"
    >
      <motion.div
        className="h-full rounded-t-2xl bg-stone-700 w-[100%] sm:w-[90%] max-w-[800px] cursor-default pt-10 px-6 overflow-auto sm:rounded-l-2xl sm:rounded-r-none"
        onClick={e => e.stopPropagation()}
        variants={variants}
        initial="enter"
        animate="finish"
        exit="exit"
      >
        <div className="flex justify-between items-center mb-5">
          <button
            className="flex items-center justify-center p-1.5 rounded-full -rotate-90 sm:rotate-0 transition-transform hover:bg-stone-600"
            onClick={() => navigate(-1)}
          >
            <CheveronLeft />
          </button>

          <Link
            to="/home"
            target="_blank"
            className="font-thin flex gap-1 items-center"
          >
            <h1>Open on other page</h1>
            <Clipboard className="w-5 h-5" />
          </Link>
        </div>

        <div className="border border-zinc-400 rounded-xl min-h-[80%] mb-10">
          <div className="p-4">
            <div className="flex my-2 justify-between">
              <h1 className="font-bold text-2xl truncate">
                {projDetail.title}
              </h1>
              <Link
                className="bg-sky-500 px-4 py-1 rounded-full"
                to={`/project-request/${projectId}`}
              >
                Apply
              </Link>
            </div>

            <div className="mt-8 text-zinc-300 flex gap-2 items-center text-sm font-thin">
              <Building className="h-5 w-5" />
              <h3>{projDetail.companyName}</h3>
              <h3>-</h3>
              <h3>
                Posted at:{" "}
                {new Date(projDetail.creationDate).toLocaleDateString()}
              </h3>
            </div>

            <div className="text-zinc-300 flex gap-2 mt-2 items-center text-sm font-thin">
              <MapPin className="h-5 w-5" />
              <h3>{projDetail.location || "N/A"}</h3>
              <h3>-</h3>
              <h3>{projDetail.inPerson ? "In-Person" : "Remote"}</h3>
            </div>
          </div>

          <hr className="border-zinc-400 my-4" />

          <p className="text-zinc-300 font-thin p-4 break-words">
            {projDetail.description}
          </p>

          <hr className="border-zinc-400 my-4" />

          <div className="mb-4">
            {projDetail.professionals.map((pro, idx) => {
              return (
                <TalentPreview
                  key={idx}
                  talent={pro as unknown as ProfessionalUser} // ugly
                />
              )
            })}
          </div>
        </div>
      </motion.div>
    </ModalBackdrop>
  )
}

export default ProjectDetails
