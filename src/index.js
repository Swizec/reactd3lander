import React from "react"
import { navigate } from "gatsby"
import { AuthProvider } from "react-use-auth"
import minimatch from "minimatch"
import Layout from "./components/layout"
import { ScopedRoute } from "./components/ScopedRoute"
import { isWorkshopPage } from "./util"

export { default as Layout } from "./components/layout"
export * from "./components/Blocks"
export { default as DemoProvider } from "./components/demo-provider"
export { default as Note } from "./components/note"
export { default as RecipeCard } from "./components/recipe-card"

const UNAUTH_PAGES = [
  "/auth0_callback",
  "/thankyou",
  "/thanks-basics",
  "/thanks-extra",
  "/thanks-full",
  "/articles/*",
  "/workshop/*",
  "/",
]

const SCOPE_PAGE_MAP = {
  "/introduction/*": ["RDV_Basic", "RDV_Full", "RDV_AllExtras"],
  "/building-blocks/*": ["RDV_Basic", "RDV_Full", "RDV_AllExtras"],
  "/d3-quick-intro/*": ["RDV_Basic", "RDV_Full", "RDV_AllExtras"],
  "/react-d3/*": ["RDV_Basic", "RDV_Full", "RDV_AllExtras"],
  "/animation/*": ["RDV_Full", "RDV_AllExtras"],
  "/ball-game/*": ["RDV_Full", "RDV_AllExtras"],
  "/canvas-game/*": ["RDV_Full", "RDV_AllExtras"],
  "/choropleth-map/*": ["RDV_Full", "RDV_AllExtras"],
  "/cookbook/*": ["RDV_Full", "RDV_AllExtras"],
  "/downloadable-materials/*": ["RDV_Full", "RDV_AllExtras"],
  "/enter-update-exit/*": ["RDV_Full", "RDV_AllExtras"],
  "/finished/*": ["RDV_Full", "RDV_AllExtras"],
  "/game-loops/*": ["RDV_Full", "RDV_AllExtras"],
  "/load-parse-data/*": ["RDV_Full", "RDV_AllExtras"],
  "/local-environment/*": ["RDV_Full", "RDV_AllExtras"],
  "/make-it-work/*": ["RDV_Full", "RDV_AllExtras"],
  "/meta-info/*": ["RDV_Full", "RDV_AllExtras"],
  "/preloader/*": ["RDV_Full", "RDV_AllExtras"],
  "/react-hooks/*": ["RDV_Full", "RDV_AllExtras"],
  "/redux-animation/*": ["RDV_Full", "RDV_AllExtras"],
  "/salaries-histogram/*": ["RDV_Full", "RDV_AllExtras"],
  "/state-app-structure/*": ["RDV_Full", "RDV_AllExtras"],
  "/simple-animation/*": ["RDV_Full", "RDV_AllExtras"],
  "/smooth-animation/*": ["RDV_Full", "RDV_AllExtras"],
  "/speed-optimizations/*": ["RDV_Full", "RDV_AllExtras"],
  "/swipe-transition/*": ["RDV_Full", "RDV_AllExtras"],
  "/tech-salaries/*": ["RDV_Full", "RDV_AllExtras"],
  "/user-control/*": ["RDV_Full", "RDV_AllExtras"],
  "/using-canvas/*": ["RDV_Full", "RDV_AllExtras"],
}

const Default = ({ element, ...props }) => (
  <Layout
    authenticated={false}
    authorized={false}
    fullwidth={!isWorkshopPage(props)}
    {...props}
  >
    {element}
  </Layout>
)

const MyRouter = ({ element, ...props }) => {
  const scopedPages = Object.keys(SCOPE_PAGE_MAP)
  const scopedKey = scopedPages.find((page) => minimatch(props.path, page))

  if (scopedKey) {
    return (
      <ScopedRoute
        element={element}
        scopes={SCOPE_PAGE_MAP[scopedKey]}
        {...props}
      />
    )
  } else {
    return <Default element={element} {...props} />
  }
}

export const wrapPageElement = ({ element, ...props }) => (
  <AuthProvider
    navigate={navigate}
    auth0_domain="serverlessreactcourse.auth0.com"
    auth0_client_id="pCO5jInBC1g4aCAtEfJNL6uftWSw40un"
    auth0_params={{
      scope: "openid profile email user_metadata",
    }}
    customPropertyNamespace="https://serverlessreact.dev"
  >
    <MyRouter element={element} {...props} {...props.props} />
  </AuthProvider>
)
