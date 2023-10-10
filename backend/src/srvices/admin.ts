const adminDashboard = () => {
  console.log("adminDashboard")
}

const adminSetVerified = (
  userId: string,
  userType: string,
  verified: boolean,
) => {
  console.log(userId, userType, verified)
}

export { adminDashboard, adminSetVerified }
