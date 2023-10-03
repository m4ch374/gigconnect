// Generic Type
export type TEndpoint<Req, Res> = {
  requestType: Req
  responseType: Res
}

export type TTesting = TEndpoint<void, { result: string }>

// ===================================================
// .................. adding more ....................
// ===================================================
