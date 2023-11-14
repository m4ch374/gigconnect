import React, { Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import useDisableScroll from "hooks/DisableScroll"
import ProfileIcon from "components/ProfileIcon"
import { Link, useNavigate } from "react-router-dom"
import Plus from "assets/icons/Plus"
import User from "assets/icons/User"
import Logout from "assets/icons/Logout"
import useToken from "hooks/Token.hooks"
import useUserType from "hooks/UserType.hooks"
import { logout } from "services/auth.services"

type TSideMenu = {
  name: string
  srcUrl: string
  setShow: Dispatch<SetStateAction<boolean>>
}

const SlideMenu: React.FC<TSideMenu> = ({ name, srcUrl, setShow }) => {
  useDisableScroll()

  const navigate = useNavigate()
  const { setToken } = useToken()
  const { userType, setUserType } = useUserType()

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0, transition: { type: "tween", ease: "circOut" } }}
      exit={{
        x: 300,
        transition: { type: "tween", ease: "circIn", duration: 0.2 },
      }}
      className="max-w-[300px] w-[100%] h-full bg-stone-700 rounded-l-xl drop-shadow-2xl cursor-default text-zinc-200/90 px-4"
    >
      <div className="flex flex-col items-center justify-center my-10 gap-4 w-full">
        <ProfileIcon verified={false} className="w-24 h-24" srcUrl={srcUrl} />
        <h1 className="text-3xl font-semibold truncate">{name}</h1>
      </div>

      <hr className="border-zinc-500/80 mb-4" />

      {userType === "company" && (
        <Link
          to={"/create-project"}
          className="flex items-center p-2 hover:bg-stone-500/30 transition-colors rounded-lg gap-2"
          onClick={() => setShow(false)}
        >
          <Plus />
          <h3>Post a Project</h3>
        </Link>
      )}

      <Link
        to={`/${userType}`}
        className="flex items-center p-2 hover:bg-stone-500/30 transition-colors rounded-lg gap-2"
        onClick={() => setShow(false)}
      >
        <User />
        <h3>View your Profile</h3>
      </Link>

      <button
        className="w-full flex items-center p-2 hover:bg-stone-500/30 transition-colors rounded-lg gap-2 text-red-500"
        onClick={() => {
          ;(async () => logout())()
          navigate("/login")

          setToken("")
          setUserType("unknown")
        }}
      >
        <Logout />
        <h3>Logout</h3>
      </button>
    </motion.div>
  )
}

export default SlideMenu
