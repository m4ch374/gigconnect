import Fetcher from "utils/fetcher"
import { TTesting } from "./types"

export const testing = () => {
  return Fetcher.init<TTesting>("GET", "").fetchData()
}
