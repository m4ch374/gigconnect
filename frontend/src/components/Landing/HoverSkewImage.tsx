// An image component that skews on hover
import { motion, useMotionValue, useTransform } from "framer-motion"
import React from "react"
import { twMerge } from "tailwind-merge"

type THoverSkewImage = {
  src: string
  className?: string
}

const HoverSkewImage: React.FC<THoverSkewImage> = ({ src, className = "" }) => {
  const x = useMotionValue(200)
  const y = useMotionValue(200)

  const rotateX = useTransform(y, [0, 400], [10, -10])
  const rotateY = useTransform(x, [0, 400], [-15, 15])

  return (
    <div
      style={{ perspective: 400 }}
      onMouseMove={e => {
        const bound = e.currentTarget.getBoundingClientRect()

        x.set(e.clientX - bound.left)
        y.set(e.clientY - bound.top)
      }}
      onMouseLeave={() => {
        x.set(200)
        y.set(200)
      }}
    >
      <motion.img
        src={src}
        className={twMerge(
          "rounded-xl drop-shadow-2xl object-cover",
          className,
        )}
        style={{ rotateX, rotateY }}
      />
    </div>
  )
}

export default HoverSkewImage
