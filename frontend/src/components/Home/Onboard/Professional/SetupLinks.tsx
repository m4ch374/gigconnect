import ArrowUpDown from "assets/icons/ArrowsUpDown"
import Cross from "assets/icons/Cross"
import Plus from "assets/icons/Plus"
import { AnimatePresence, LayoutGroup, Reorder, motion } from "framer-motion"
import { StepContext } from "hooks/Steps.hooks"
import useArray from "hooks/UseArray.hooks"
import useObject from "hooks/UseObject.hooks"
import React, { FormEvent, useCallback, useContext, useMemo } from "react"
import toast from "react-hot-toast"
import { ExternalLink } from "types/general.types"

const LinkItem: React.FC<{
  item: ExternalLink
  removeAt: (idx: number) => void
  currIdx: number
}> = ({ item, removeAt, currIdx }) => {
  return (
    <div className="border border-zinc-400 rounded-md p-2 flex justify-between bg-stone-600 cursor-grab">
      <div className="flex items-center">
        <div className="px-2 mr-2 border-r border-zinc-400 h-full flex items-center text-zinc-400">
          <ArrowUpDown />
        </div>
        <div>
          <h1 className="font-semibold text-xl">{item.websiteName}</h1>
          <a className="text-sky-500 underline" href={item.websiteLink}>
            {item.websiteLink}
          </a>
        </div>
      </div>
      <button
        className="border-l border-zinc-500 pl-2 text-zinc-400 hover:text-zinc-200"
        onClick={() => removeAt(currIdx)}
      >
        <Cross className="h-8 w-8" />
      </button>
    </div>
  )
}

const SetupLinks: React.FC = () => {
  const step = useContext(StepContext).step

  const { arr, pushItem, removeAt, setArr } = useArray<ExternalLink>([])

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
    <div className="w-full h-full p-4 overflow-auto mb-2">
      <h1 className="mb-2">
        Add {step === 2 ? "qualifications" : "external links"}
      </h1>

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
                        <LinkItem
                          item={item}
                          removeAt={removeAt}
                          currIdx={idx}
                        />
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
              placeholder={step === 2 ? "Qualification" : "Website name"}
              value={newItem.websiteName}
              onChange={e => setNewItem("websiteName", e.currentTarget.value)}
            />
            <input
              className="w-full bg-transparent border-b border-zinc-400 pb-1 outline-none focus:border-zinc-200"
              placeholder={step === 2 ? "Certification Link" : "Website Link"}
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
    </div>
  )
}

export default SetupLinks
