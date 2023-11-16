// A 404 not found page
import { Link } from "react-router-dom"

const NotFound: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-8 items-center justify-center">
      <img src="/Trip.svg" className="drop-shadow-glow-blue mt-10 w-80 h-80" />
      <h1 className=" text-zinc-200 text-center font-bold text-3xl sm:text-6xl pb-8">
        Looks like you&apos;re lost.
      </h1>
      <Link to="/" className="text-sky-500 underline text-xl">
        Back to safety
      </Link>
    </div>
  )
}

export default NotFound
