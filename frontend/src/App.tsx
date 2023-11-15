import AppRoutes from "AppRoutes"
import React from "react"
import { Toaster } from "react-hot-toast"

const App: React.FC = () => {
  return (
    <>
      <AppRoutes />
      <Toaster
        toastOptions={{
          position: "bottom-center",
          duration: 2000,
          style: {
            background: "rgb(68 64 60)",
            color: "white",
            minHeight: 70,
          },
        }}
      />
    </>
  )
}

export default App
