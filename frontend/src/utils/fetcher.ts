import { TEndpoint } from "services/types"

type Method = "GET" | "POST" | "PUT" | "DELETE"

type ErrorResponse = {
  message: string
}

// Thy type any is very much needed in this case
/* eslint-disable @typescript-eslint/no-explicit-any */
class Fetcher<T extends TEndpoint<any, any>> {
  private baseURL = "http://localhost:8080"

  private requestConf: RequestInit | undefined

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
    this.requestConf = {
      ...this.requestConf,
      body: JSON.stringify(payload),
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

  /**
   * @deprecated
   * Use newFetchData() instead.
   * fetchData() will be removed prior to final submission.
   */
  async fetchData(): Promise<T["responseType"]> {
    try {
      const resp = await fetch(this.baseURL, this.requestConf)

      // Its either my skill issue or its just really hard to type it out
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (resp.ok) return await resp.json()

      this.logFetchError(resp)
      return undefined
    } catch (e) {
      console.log("unexpected error happened")
      console.log(e)
    }
  }

  async newFetchData(): Promise<{
    ok: boolean
    data: T["responseType"]
    error: string
  }> {
    try {
      const res = await fetch(this.baseURL, this.requestConf)
      if (res.status === 400 || res.status === 403) {
        const errObj = (await res.json()) as ErrorResponse
        return {
          ok: false,
          data: null,
          error: errObj.message,
        }
      } else if (!res.ok) {
        throw new Error()
      } else {
        const resObj = (await res.json()) as T["responseType"]
        return {
          ok: true,
          data: resObj,
          error: "",
        }
      }
    } catch {
      return {
        ok: false,
        data: null,
        error: "An unexpected error occured",
      }
    }
  }

  // =============================================================
  // Helpers
  // =============================================================

  // Writing a better logger soon
  private logFetchError(e: Response) {
    console.log(e)
    e.json()
      .then(data => {
        console.log(data)
      })
      .catch(er => console.log(er))
  }
}

export default Fetcher
