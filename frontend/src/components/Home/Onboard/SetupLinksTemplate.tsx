import Plus from "assets/icons/Plus"
import { AnimatePresence, LayoutGroup, Reorder, motion } from "framer-motion"
import useArray from "hooks/UseArray.hooks"
import useObject from "hooks/UseObject.hooks"
import React, { FormEvent, useCallback, useMemo } from "react"
import toast from "react-hot-toast"
import { ExternalLink } from "types/general.types"
import LinkItem from "./LinkItem"

type TSetupLinksTemplate = {
  inputNamePlaceholder: string
  inputLinkPlaceholder: string
  arrayController: ReturnType<typeof useArray<ExternalLink>>
}

const SetupLinksTemplate: React.FC<TSetupLinksTemplate> = ({
  inputNamePlaceholder,
  inputLinkPlaceholder,
  arrayController,
}) => {
  const { arr, pushItem, removeAt, setArr } = arrayController

  const [newItem, setNewItem, clearItem] = useObject<ExternalLink>({
    websiteLink: "",
    websiteName: "",
  })

  const isValidUrl = useMemo(() => {
    // Thanks google
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i",
    ) // fragment locator
    return !!pattern.test(newItem.websiteLink)
  }, [newItem.websiteLink])

  const handleAddQualification = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!newItem.websiteLink || !newItem.websiteName) {
        toast.error("Fields cannot be empty")
        return
      }

      if (!isValidUrl) {
        toast.error("Link is not a valid URL")
        return
      }

      pushItem(newItem)
      clearItem()
    },
    [clearItem, isValidUrl, newItem, pushItem],
  )

  return (
    <div className="flex flex-col gap-2 h-[300px]">
      <LayoutGroup>
        <Reorder.Group
          className="flex flex-col gap-2"
          values={arr}
          onReorder={setArr}
          axis="y"
        >
          <AnimatePresence>
            {arr.map((item, idx) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  key={JSON.stringify(item)}
                >
                  <Reorder.Item
                    key={JSON.stringify(item)}
                    value={item}
                    className="relative"
                  >
                    <motion.div layout="position">
                      <LinkItem item={item} removeAt={removeAt} currIdx={idx} />
                    </motion.div>
                  </Reorder.Item>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </Reorder.Group>
      </LayoutGroup>
      <form
        className="border border-zinc-400 rounded-md p-2 flex justify-between bg-stone-600"
        onSubmit={handleAddQualification}
      >
        <div className="flex flex-col gap-2 w-full pr-8">
          <input
            className="font-semibold text-xl w-[80%] bg-transparent border-b border-zinc-400 pb-1 outline-none focus:border-zinc-200"
            placeholder={inputNamePlaceholder}
            value={newItem.websiteName}
            onChange={e => setNewItem("websiteName", e.currentTarget.value)}
          />
          <input
            className="w-full bg-transparent border-b border-zinc-400 pb-1 outline-none focus:border-zinc-200"
            placeholder={inputLinkPlaceholder}
            value={newItem.websiteLink}
            onChange={e => setNewItem("websiteLink", e.currentTarget.value)}
          />
        </div>
        <button
          className="border-l border-zinc-500 pl-2 text-zinc-400 hover:text-zinc-200"
          type="submit"
        >
          <Plus className="h-8 w-8" />
        </button>
      </form>
    </div>
  )
}

export default SetupLinksTemplate
