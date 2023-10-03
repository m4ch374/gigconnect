```ts
// Data types
type externalLink = {
    websiteName: string, // Client and server should verify that this is not an empty string.
    websiteLink: string // Client and server should verify that this is a website URL.
}


// ROUTE = /api/login, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    email: string,
    password: string
}
// RESPONSE 403 if invalid credentials.
// RESPONSE 200 if successful login.
type response = {
    // Insert additional items here as required by session/token system for a logged in user.
    userType: "admin" | "company" | "professional"
}

// ROUTE = /api/logout, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    // Insert items here as required by session/token system for a logged in user.
}
// RESPONSE 400 if part of the request is invalid, even if not logged in.
// RESPONSE 200 otherwise.
type response = {
    success: boolean
}


// ROUTE = /api/company/create, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    email: string, // Client and server should verify that this is an email. Server should verify that there are no duplicates for any type of user.
    companyName: string, // Client and server should verify that this is not an empty string. Server should verify that there are no duplicates.
    identifierType: "abn" | "acn", // Radio buttons on client page, server should verify that it is one of these two values only.
    identifierNum: string, // Client and server should verify the format of this based on the value of identifierType
    password: string // Client and server should verify any password security requirements
}
// RESPONSE 400 if part of the request is invalid.
// RESPONSE 200 on success.
type response = {
    // Insert additional items here as required by session/token system for a logged in user.
    userType: "company" // shouldn't be anything else for this route
}

// ROUTE = /api/professional/create, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    email: string, // Client and server should verify that this is an email. Server should verify that there are no duplicates for any type of user.
    firstName: string, // Client and server should verify that this is not an empty string.
    lastName: string, // Client and server should verify that this is not an empty string.
    password: string // Client and server should verify any password security requirements
}
// RESPONSE 400 if part of the request is invalid.
// RESPONSE 200 on success.
type response = {
    // Insert additional items here as required by session/token system for a logged in user.
    userType: "professional" // shouldn't be anything else for this route
}

// ROUTE = /api/company/profiledata, METHOD = GET
// REQUEST - items are sent as query params
type request = {
    // Insert items here as required by session/token system for a logged in user.
}
// RESPONSE 403 if not logged in or not a company user, response object should not contain any information.
// RESPONSE 200 if logged in as a company user.
type response = {
    companyName: string,
    companyDescription: string // Empty string on initial account creation
    externalWebsites: externalLink[] // Empty array on initial account creation
    // Insert additional items stored for a company profile here.
}

// ROUTE = /api/company/profiledata/update, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    // Insert additional items here as required by session/token system for a logged in user.
    companyName: string, // Client and server should verify that this is not an empty string. Server should verify that there are no duplicates.
    companyDescription: string // Can be an empty string,
    externalWebsites: externalLink[] // Can be an empty array. Client and server should verify that any array elements are of the correct type.
    // Insert additional items stored for a company profile here.
}
// RESPONSE 403 if not logged in or not a company user, response object can be {success: false}
// RESPONSE 400 if part of the request is invalid, even if not logged in.
// RESPONSE 200 if logged in as a company user and request is valid.
type response = {
    success: boolean // Indicates if profile data was successfully updated.
}


// ROUTE = /api/professional/profiledata, METHOD = GET
// REQUEST - items are sent as query params
type request = {
    // Insert items here as required by session/token system for a logged in user.
}
// RESPONSE 403 if not logged in or not a professional user, response object should not contain any information.
// RESPONSE 200 if logged in as a professional user.
type response = {
    firstName: string,
    lastName: string,
    description: string // Empty string on initial account creation.
    skills: string[] // Empty array on initial account creation.
    externalWebsites: externalLink[] // Empty array on initial account creation.
    // Insert additional items stored for a professional profile here.
}

// ROUTE = /api/professional/profiledata/update, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    // Insert additional items here as required by session/token system for a logged in user.
    firstName: string, // Client and server should verify that this is not an empty string.
    lastName: string, // Client and server should verify that this is not an empty string.
    description: string // Can be an empty string.
    skills: string[] // Can be an empty array. Client and server should verify that any array elements are not empty strings.
    externalWebsites: externalLink[] // Can be an empty array. Client and server should verify that any array elements are of the correct type.
    // Insert additional items stored for a professional profile here.
}
// RESPONSE 403 if not logged in or not a professional user. Response object can be {success: false}.
// RESPONSE 400 if part of the request is invalid, even if not logged in.
// RESPONSE 200 if logged in as a professional user and request is valid.
type response = {
    success: boolean // Indicates if profile data was successfully updated.
}

// ROUTE = /api/admin/setverified, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    // Insert additional items here as required by session/token system for a logged in user.
    userId: string // User ID of the user to have their verified status set
    userType: "company" | "professional",
    verified: boolean // Toggle of whether to set or remove verified status
}
// RESPONSE 403 if not logged in or not an admin user. Response object can be {success: false}.
// RESPONSE 400 if part of the request is invalid, even if not logged in.
// RESPONSE 200 if logged in as an admin user and request is valid.
type response {
    success: boolean
}
```
