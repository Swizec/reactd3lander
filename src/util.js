export function currentLocation({ location }) {
  if (typeof window !== "undefined") {
    return window.location.pathname
  } else if (location) {
    return location.pathname
  } else {
    return null
  }
}

export function isArticlePage({ location }) {
  return currentLocation({ location }).includes("articles")
}

// candidate for useAuth feature
export function isAuthorized(user) {
  if (!user["https://serverlessreact.dev/user_metadata"]) {
    return false
  }
  const roles = ["RDV_Basic", "RDV_Full", "RDV_AllExtras"]

  return user["https://serverlessreact.dev/user_metadata"].roles.some((r) =>
    roles.includes(r)
  )
  // return user["https://serverlessreact.dev/user_metadata"].roles.includes(
  //   "RDV_Basic"
  // )
}
