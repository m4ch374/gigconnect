import AppRoutes from "AppRoutes"
import React from "react"
import { Toaster } from "react-hot-toast"

const App: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <Toaster
        toastOptions={{
          className: "bg-stone-700 text-white min-w-[100px]",
          position: "bottom-center",
          duration: 2000,
        }}
      />
    </>
  )
}

export default App
