```ts
// ##################
// ### Data types ###
type projectStatus = "open" | "inprogress" | "closed"

type Professional = {
    userId: string,
    firstName: string,
    lastName: string,
    profilePhoto: string,
    verified: boolean,
    description: string,
}

// following is a request to join a project
type Request = {
    id: string,
    projectId: string,
    userId: string,
    message: string,
    creationDate: string,
}

type externalLink = {
    websiteName: string, // Client and server should verify that this is not an empty string.
    websiteLink: string // Client and server should verify that this is a website URL.
}

// ##############
// ### Routes ###

// ROUTE = /api/login, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    email: string,
    password: string
}
// RESPONSE 403 if invalid credentials.
type response403 = {
    message: string
}
// RESPONSE 200 if successful login.
type response200 = {
    loginToken: string,
    userType: "admin" | "company" | "professional"
}

// ROUTE = /api/logout, METHOD = POST
// REQUEST - send login token in header, request as stringified JSON in body
type request = {

}
// RESPONSE 400 if part of the request is invalid, even if not logged in.
type response400 = {
    message: string
}
// RESPONSE 200 otherwise.
type response200 = {
    success: boolean
}

// ROUTE = /api/company/create, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    email: string, // Client and server should verify that this is an email. Server should verify that there are no duplicates for any type of user.
    companyName: string, // Client and server should verify that this is not an empty string.
    abn: string, // Client and server should verify that this is the valid format of an ABN.
    password: string // Client and server should verify any password security requirements
}
// RESPONSE 400 if part of the request is invalid.
type response400 = {
    message: string
}
// RESPONSE 200 on success.
type response200 = {
    loginToken: string,
    userType: "company" // shouldn't be anything else for this route
}

// ROUTE = /api/professional/create, METHOD = POST
// REQUEST - sent as a stringified JSON object in the request body
type request = {
    email: string, // Client and server should verify that this is an email. Server should verify that there are no duplicates for any type of user.
    firstName: string, // Client and server should verify that this is not an empty string.
    lastName: string, // Client and server should verify that this is not an empty string.
    password: string // Client and server should verify any password security requirements.
}
// RESPONSE 400 if part of the request is invalid.
type response400 = {
    message: string
}
// RESPONSE 200 on success.
type response200 = {
    loginToken: string,
    userType: "professional" // shouldn't be anything else for this route
}

// ROUTE = /api/company/profiledata, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {

}
// RESPONSE 403 if not logged in or not a company user, response object should not contain any information.
type response403 = {
    message: string
}
// RESPONSE 200 if logged in as a company user.
type response200 = {
    companyName: string,
    profilePhoto: string,
    abn: string,
    companyDescription: string, // Empty string on initial account creation
    externalWebsites: externalLink[], // Empty array on initial account creation
    verified: boolean,
    // Insert additional items stored for a company profile here.
    projects: [
        {
            projectId: string,
            title: string,
            publicDescription: string,
            companyName: string,
            companyId: string,
            inPerson: boolean,
            location: string,
            tags: string[],
            creationDate: string,
            status: projectStatus,
        }
    ],
    hasReviews: boolean,
    reviewAvg: number
}

// ROUTE = /api/company/profiledata/update, METHOD = POST
// REQUEST - send login token in header, request as stringified JSON in body
type request = {
    companyName: string, // Client and server should verify that this is not an empty string.
    profilePhoto: string,
    abn: string, // Client and server should verify that this is the valid format of an ABN.
    companyDescription: string, // Can be an empty string,
    externalWebsites: externalLink[] // Can be an empty array. Client and server should verify that any array elements are of the correct type.
    // Insert additional items stored for a company profile here.
}
// RESPONSE 403 if not logged in or not a company user
type response403 = {
    message: string
}
// RESPONSE 400 if part of the request is invalid, even if not logged in.
type response400 = {
    message: string
}
// RESPONSE 200 if logged in as a company user and request is valid.
type response = {
    success: boolean // Indicates if profile data was successfully updated.
}


// ROUTE = /api/professional/profiledata, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {

}
// RESPONSE 403 if not logged in or not a professional user, response object should not contain any information.
// RESPONSE 200 if logged in as a professional user.
type response = {
    firstName: string,
    lastName: string,
    profilePhoto: string,
    description: string, // Empty string on initial account creation.
    skills: string[], // Empty array on initial account creation.
    qualifications: externalLink[], // Empty array on initial account creation
    externalWebsites: externalLink[], // Empty array on initial account creation.
    // Insert additional items stored for a professional profile here.
    verified: boolean,
    projects: [
        {
            projectId: string,
            title: string,
            publicDescription: string,
            companyName: string,
            companyId: string,
            inPerson: boolean,
            location: string,
            tags: string[],
            creationDate: string,
            status: projectStatus,
        }
    ],
    hasReviews: boolean,
    reviewAvg: number
}

// ROUTE = /api/professional/profiledata/update, METHOD = POST
// REQUEST - send login token in header, request as stringified JSON in body
type request = {
    firstName: string, // Client and server should verify that this is not an empty string.
    lastName: string, // Client and server should verify that this is not an empty string.
    profilePhoto: string,
    description: string, // Can be an empty string.
    skills: string[], // Can be an empty array. Client and server should verify that any array elements are not empty strings.
    qualifications: externalLink[] // Can be an empty array. Client and server should verify that any array elements are of the correct type.
    externalWebsites: externalLink[] // Can be an empty array. Client and server should verify that any array elements are of the correct type.
    // Insert additional items stored for a professional profile here.
}
// RESPONSE 403 if not logged in or not a professional user.
type response403 = {
    message: string
}
// RESPONSE 400 if part of the request is invalid, even if not logged in.
type response400 = {
    message: string
}
// RESPONSE 200 if logged in as a professional user and request is valid.
type response200 = {
    success: boolean // Indicates if profile data was successfully updated.
}

// ROUTE = /api/admin/dashboard, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {

}
// RESPONSE 403 if not logged in or not an admin user. Response object can be {success: false}.
type response403 = {
    message: string
}
// RESPONSE 400 if part of the request is invalid, even if not logged in.
type response400 = {
    message: string
}
// RESPONSE 200 if logged in as an admin user and request is valid.
type response200 = {
    companyUsers: [
        {
            userId: string,
            companyName: string,
            profilePhoto: string,
            verified: boolean,
        }
    ],
    professionalUsers: [
        {
            userId: string,
            firstName: string,
            lastName: string,
            profilePhoto: string,
            verified: boolean,
        }
    ]
}

// ROUTE = /api/admin/setverified, METHOD = POST
// REQUEST - send login token in header, request as stringified JSON in body
type request = {
    userId: string // User ID of the user to have their verified status set
    userType: "company" | "professional",
    verified: boolean // Toggle of whether to set or remove verified status
}
// RESPONSE 403 if not logged in or not an admin user. Response object can be {success: false}.
type response403 = {
    message: string
}
// RESPONSE 400 if part of the request is invalid, even if not logged in.
type responase400 = {
    message: string
}
// RESPONSE 200 if logged in as an admin user and request is valid.
type response = {
    success: boolean
}

// ################################################################################
// ############################### S P R I N T  2 #################################
// ################################################################################

// ROUTE = /api/professional/profiledata/public, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {
    userId: string,
}
type response200 = {
    firstName: string,
    lastName: string,
    profilePhoto: string,
    description: string,
    skills: string[],
    qualifications: externalLink[],
    externalWebsites: externalLink[],
    verified: boolean,
    projects: projects[], // only return completed projects for public view
    hasReviews: boolean,
    reviewAvg: number
}

// ROUTE = /api/company/profiledata/public, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {
    userId: string,
}
type response200 = {
    companyName: string,
    profilePhoto: string,
    abn: string,
    companyDescription: string,
    externalWebsites: externalLink[],
    verified: boolean,
    projects: projects[], // only return completed projects for public view
    hasReviews: boolean,
    reviewAvg: number
}

// ROUTE = /api/project/create, METHOD = POST
// REQUEST - send LOGIN TOKEN in header, request as stringified JSON in body
type request = {
    title: string,
    publicDescription: string,
    privateDescription: string,
    tags: string[],
    inPerson: boolean,
    location: string,
}
type response400 = {
    message: string,
}
type response200 = {
    projectId: string,
}

// ROUTE = /api/project/profiledata/professional, METHOD = GET
// REQUEST - send login token in header, request as query params
//      ### NOTE: ACCEPTED PROFESH'S CAN SEE OTHER ACCEPTED PROFESH'S
type request = {
    projectId: string,
}
type response = {
    title: string,
    companyId: string,
    companyName: string,
    description: string, // ## EITHER concatenation of public+private, or just public
    tags: string[],
    inPerson: boolean,
    location: string,
    creationDate: string,
    status: projectStatus,
    professionals: Professional[] || [], // # empty arr if profesh's not accepted
}

// ROUTE = /api/project/profiledata/company, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {
    projectId: string
}
type response = {
    title: string,
    companyId: string,
    companyName: string,
    description: string, // ## NOTE: concatenation of public + private descriptions
    tags: string[],
    inPerson: boolean,
    location: string,
    creationDate: string,
    status: projectStatus,
    professionals: Professional[],
    requests: Request[].    // ## ONLY owner Company can see profesh requests
}

// ROUTE = /api/project/update, METHOD = POST
// REQUEST - send LOGIN TOKEN in header, request as stringified JSON in body
type request = {
    projectId: string,
    title: string,
    publicDescription: string,
    privateDescription: string,
    tags: string[],
    inPerson: boolean,
    location: string,
}
type response400 = {
    message: string,
}
type response200 = {
    success: boolean,
}

// ROUTE = /api/project/changestatus, METHOD = POST
// REQUEST - send LOGIN TOKEN in header, request as stringified JSON in body
//
// NOTE: Moves the project status forward 'one step' and returns the new status.
// (e.g. from open to inprogress OR from inprogress to closed)
// If the project is already closed, nothing happens.
type request = {
    projectId: string,
}
type response400 = {
    message: string,
}
type response200 = {
    newStatus: projectStatus,
}

// ROUTE = /api/project/request, METHOD = POST
// REQUEST - send login token in header, request as stringified JSON in body
type request = {
    projectId: string, // id of project which profesh is requesting to join
    message: string
}
type response400 = {
    message: string,
}
type response200 = {
    success: boolean,
}

// ROUTE = /api/project/request/respond, METHOD = POST
// REQUEST - send login token in header, request as stringified JSON in body
type request = {
    requestId: string,
    accepted: boolean,
}
type response400 = {
    message: string,
}
type response200 = {
    success: boolean,
}

// ROUTE = /api/professional/allpublicprofiledata, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = { }
// RESPONSE 403 if not logged in. Response object can be {success: false}.
type response403 = {
    message: string
}
// RESPONSE 200 if logged in and request is valid.
type response200 = {
    professionalUsers: [
        {
            userId: string,
            firstName: string,
            lastName: string,
            profilePhoto: string,
            verified: boolean,
            description: string,
        }
    ],
}

// ROUTE = /api/company/allpublicprofiledata, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = { }
// RESPONSE 403 if not logged in. Response object can be {success: false}.
type response403 = {
    message: string
}
// RESPONSE 200 if logged in and request is valid.
type response200 = {
   companyUsers: [
        {
            userId: string,
            companyName: string,
            profilePhoto: string,
            verified: boolean,
            description: string,
        }
    ],
}

// ROUTE = /api/project/allpublicprofiledata, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = { }
// RESPONSE 403 if not logged in. Response object can be {success: false}.
type response403 = {
    message: string
}
// RESPONSE 200 if logged in and request is valid. Include ALL PROJECTS THAT HAVE NOT STARTED
type response200 = {
    projects: [
        {
            projectId: string,
            title: string,
            publicDescription: string,
            companyName: string,
            companyId: string,
            inPerson: boolean,
            location: string,
            tags: string[],
            creationDate: string
            status: "open",
        }
    ]
}

// ROUTE = /api/project/removeprofessional/, METHOD = POST
// REQUEST - send login token in header, request as query params
type request = {
    projectId: string,
    professionalId: string,
}
// RESPONSE 403 if not logged in. Response object can be {success: false}.
type response403 = {
    message: string,
}
// RESPONSE 400 if: userId not in project OR token userId (company) is not project owner
type response400 = {
    message: string,
}
type response200 = {
    success: boolean,
}

// SPRINT 3 ROUTES AND TYPES START HERE


// ROUTE = /api/project/data, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {
    projectId: string
}
type response = {
    title: string,
    companyId: string,
    companyName: string,
    description: string, // Concat public and private descriptions with \n
                         // inbetween if user is part of the project, otherwise
                         // only public descriptoin.
    tags: string[],
    inPerson: boolean,
    location: string,
    creationDate: string,
    status: projectStatus,
    professionals: Professional[], // Empty array if not part of the project
    requests: Request[] // Empty array if not part of the project
}

// ROUTE = /api/project/editdata, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {
    projectId: string
}
// RESPONSE 403 if not logged in, or the logged in user is not the company
// user who owns the relevant project.
type response403 = {
    message: string
}
// RESPONSE 400 if invalid projectId
type response400 = {
    message: string
}
type response200 = {
    title: string,
    publicDescription: string,
    privateDescription: string,
    tags: string[],
    inPerson: boolean,
    location: string,
}

// ROUTE = /api/project/requestdata, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {
    requestId: string
}
// RESPONSE 403 if not logged in, or the logged in user is not the company
// user who owns the relevant project.
type response403 = {
    message: string
}
// RESPONSE 400 if invalid requestId
type response400 = {
    message: string
}
// RESPONSE 200 if logged in and request is valid.
type response200 = {
    requestId: string,
    projectId: string,
    projectName: string,
    userId: string,
    firstname: string,
    lastName: string,
    profilePhoto: string,
    message: string,
    creationDate: string,
}

// ROUTE = /api/project/delete, METHOD = POST
// REQUEST - send login token in header, request as stringified JSON in body
type request = {
    projectId: string
}
// RESPONSE 403 if not logged in, or the logged in user is not the company
// user who owns the relevant project.
type response403 = {
    message: string
}
// RESPONSE 400 if invalid projectId
type response400 = {
    message: string
}
type request200 = {
    success: boolean
}

// ROUTE = /api/project/review-userinfo, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {
    projectId: string,
}
// RESPONSE 403 if not logged in, or the logged in user is not part of the
// relevant project
type response403 = {
    message: string
}
// RESPONSE 400 if invalid projectId
type response400 = {
    message: string
}
type response200 = {
    // Return an array of users who this person can review
    users: [
        {
            userId: string,
            userName: string, // Concat first + last with ' ' if professional user
            profilePhoto: string
        }
    ]
}

// ROUTE = /api/project/review-data, METHOD = POST
// REQUEST - send login token in header, request as stringified JSON in body
type request = {
    projectId: string,
    reviews: [
        {
            userId: string, // User ID of person receiving this review
            rating: number, // between 0 and 5
            comment: string
        }
    ]
}
// RESPONSE 403 if not logged in, or the logged in user is not part of the
// relevant project
type response403 = {
    message: string
}
// RESPONSE 400 if invalid projectId, or if one or more users in ReviewData[]
// is not part of the project.
type response400 = {
    message: string
}
// RESPONSE 200 if request is valid and review data saved successsfully
type response200 = {
    success: boolean
}

// ROUTE = /api/user/reviews, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {
    userId: string,
    userType: string
}
type response200 = {
    // Return a list of reviews which this user has received
    reviews: [
        {
            userId: string,
            userName: string, // concat first + last with ' ' if professional user
            profilePhoto: string,
            projectId: string,
            projectName: string,
            rating: number,
            comment: string
        }
    ]
}

// ROUTE = /api/user/onboarded, METHOD = GET
// REQUEST - send login token in header, request as query params
type request = {}
type response200 = {
  onboarded: boolean
}

// ROUTE = /api/user/onboarded, METHOD = PUT
// REQUEST - send login token in header, request as query params
type request = {}
type response200 = {
  onboarded: boolean // always true when calling this method
}


```
