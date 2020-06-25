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

export function isWorkshopPage({ location }) {
  return currentLocation({ location }).includes("workshop")
}
