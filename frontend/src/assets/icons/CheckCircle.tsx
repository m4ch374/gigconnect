// Generated with https://heroicons.com/
import React from "react"
import { twMerge } from "tailwind-merge"

const CheckCircle: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={twMerge("w-6 h-6", className)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export default CheckCircle
