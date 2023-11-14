import { TEndpoint } from "services/types"

type Method = "GET" | "POST" | "PUT" | "DELETE"

type ErrorResponse = {
  message: string
}

// Thy type any is very much needed in this case
/* eslint-disable @typescript-eslint/no-explicit-any */

// Create the Fetcher class which acts as a wrapper around fetch() calls
// with some conveniances for fetching data from the backend API
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

  // Create Fetcher instance, intialising API route to call and HTTP request method
  static init<T extends TEndpoint<any, any> = TEndpoint<void, void>>(
    method: Method,
    endpoint: string,
  ) {
    const fetcher = new Fetcher<T>(method)
    fetcher.baseURL += endpoint

    return fetcher
  }

  // Add a payload to the request body as a stringified JSON object
  withJsonPaylad(payload: T["requestType"]) {
    this.requestConf = {
      ...this.requestConf,
      body: JSON.stringify(payload),
    }
    return this
  }

  // Add search params to the request URI
  withParams(params: T["requestType"]) {
    this.baseURL += "?" + new URLSearchParams(params).toString()
    return this
  }

  // Add a token to request headers
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

  // Add currently logged in user's token to request headers
  withCurrentToken() {
    return this.withToken(localStorage.getItem("token")!)
  }

  fetchPromise(): Promise<T["requestType"]> {
    return fetch(this.baseURL, this.requestConf)
  }

  // Call the API, returning a representation of the request outcome,
  // response data and an error message if an error occured.
  async newFetchData(): Promise<{
    ok: boolean
    data: T["responseType"]
    error: string
  }> {
    try {
      const res = await fetch(this.baseURL, this.requestConf)
      const whiteListedErrorCode = [400, 401, 403]
      if (whiteListedErrorCode.some(c => c === res.status)) {
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
}

export default Fetcher
