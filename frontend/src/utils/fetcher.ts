import { TEndpoint } from "services/types"

type Method = "GET" | "POST" | "PUT" | "DELETE"

// Thy type any is very much needed in this case
/* eslint-disable @typescript-eslint/no-explicit-any */
class Fetcher<T extends TEndpoint<any, any>> {
  private baseURL = "http://localhost:8080"

  private requestConf: RequestInit | undefined

  private payload: T["requestType"] | undefined

  private constructor(method: Method) {
    this.requestConf = { method }

    if (method != "GET") {
      this.requestConf = {
        ...this.requestConf,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    }

    return this
  }

  static init<T extends TEndpoint<any, any> = TEndpoint<void, void>>(
    method: Method,
    endpoint: string,
  ) {
    const fetcher = new Fetcher<T>(method)
    fetcher.baseURL += endpoint

    return fetcher
  }

  withJsonPaylad(payload: T["requestType"]) {
    this.payload = payload

    this.requestConf = {
      ...this.requestConf,
      body: payload,
    }
    return this
  }

  withParams(params: T["requestType"]) {
    this.baseURL += "?" + new URLSearchParams(params).toString()
    return this
  }

  withToken(token: string) {
    this.requestConf = {
      ...this.requestConf,
      headers: {
        ...this.requestConf?.headers,
        Authorization: `Bearer ${token}`,
      },
    }
    return this
  }

  withCurrentToken() {
    return this.withToken(localStorage.getItem("token")!)
  }

  fetchPromise(): Promise<T["requestType"]> {
    return fetch(this.baseURL, this.requestConf)
  }

  // Fuck it we ball bro
  // No error checking lets go
  async fetchData(): Promise<T["responseType"]> {
    const resp = await fetch(this.baseURL, this.requestConf)

    // Its either my skill issue or its just really hard to type it out
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (resp.ok) return resp.json()

    this.logFetchError(resp)
    return undefined
  }

  // =============================================================
  // Helpers
  // =============================================================
  private logFetchError(e: Response) {
    const errorMeta = {
      name: "Unknown",
      message: "Unknown error",
      code: "Unknown",
      config: "Unknown",
    }

    if (e instanceof Error) {
      errorMeta.name = e.name
      errorMeta.code = e.status.toString()
      errorMeta.message = e.message
      errorMeta.config = JSON.stringify(
        {
          baseURL: this.baseURL,
          headers: this.requestConf?.headers || {},
          body: this.payload || {},
        },
        undefined,
        4,
      ).slice(2, -1)
    }

    console.log()
    // Adding newline fucks up the formatting from expo
    console.log("============================================================")
    console.log("An error has occurred!")
    console.log(`\tName:    ${errorMeta.name}`) // I dont think js provides us anything w/ alligning stuff
    console.log(`\tCode:    ${errorMeta.code}`)
    console.log(`\tMessage: ${errorMeta.message}`)
    console.log()
    console.log("************************************************************")
    console.log("*                       CONFIG                             *")
    console.log("************************************************************")
    errorMeta.config
      .split("\n")
      .forEach(l => console.log(l.replace(/ {4}/, "")))
    console.log("============================================================")
  }
}

export default Fetcher
