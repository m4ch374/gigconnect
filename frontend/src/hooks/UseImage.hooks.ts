// A useState wrapper that provides additional controls for converting
// file blobs to base64 text
import { useCallback, useState } from "react"
import toast from "react-hot-toast"

const useImage = (defaultStr: string = "") => {
  const [imgStr, setImgStr] = useState(defaultStr)

  const setImg = useCallback((file: File) => {
    const acceptedExtesions = ["jpg", "png", "svg"]
    const fileExtension = file.name.split(".").pop() || ""
    if (!acceptedExtesions.some(e => e.includes(fileExtension))) {
      toast.error("Image format is not supported")
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => setImgStr(reader.result as string)
  }, [])

  return { imgStr, setImgStr, setImg }
}

export default useImage
