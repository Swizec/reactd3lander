import React from "react"
import { navigate } from "gatsby"
import { AuthProvider } from "react-use-auth"
import { Router } from "@reach/router"
import Layout from "./components/layout"
import { ScopedRoute } from "./components/ScopedRoute"

export { default as Layout } from "./components/layout"
export * from "./components/Blocks"
export { default as DemoProvider } from "./components/demo-provider"
export { default as Note } from "./components/note"
export { default as RecipeCard } from "./components/recipe-card"

const UNAUTH_PAGES = [
  "/",
  "/auth0_callback",
  "/thankyou",
  "/thanks-basics",
  "/thanks-extra",
  "/thanks-full",
  "/articles",
  "/articles/*",
]

const SCOPE_PAGE_MAP = {
  "/introduction/*": ["RDV_Basic", "RDV_Full", "RDV_AllExtras"],
  "/building-blocks/*": ["RDV_Basic", "RDV_Full", "RDV_AllExtras"],
  "/d3-quick-intro/*": ["RDV_Basic", "RDV_Full", "RDV_AllExtras"],
  "/react-d3/*": ["RDV_Basic", "RDV_Full", "RDV_AllExtras"],
  "/awesome/*": [],
  "/animation/*": [],
  "/ball-game/*": [],
  "/canvas-game/*": [],
  "/choropleth-map/*": [],
  "/cookbook/*": [],
  "/downloadable-materials/*": [],
  "/enter-update-exit/*": [],
  "/finished/*": [],
  "/game-loops/*": [],
  "/load-parse-data/*": [],
  "/local-environment/*": [],
  "/make-it-work/*": [],
  "/meta-info/*": [],
  "/preloader/*": [],
  "/react-hooks/*": [],
  "/redux-animation/*": [],
  "/salaries-histogram/*": [],
  "/simple-animation/*": [],
  "/smooth-animation/*": [],
  "/speed-optimizations/*": [],
  "/swipe-transition/*": [],
  "/tech-salaries/*": [],
  "/user-control/*": [],
  "/using-canvas/*": [],
}

const Default = ({ children, ...props }) => (
  <Layout
    authenticated={false}
    authorized={false}
    fullwidth={true}
    {...props}
    {...props.props}
  >
    {children}
  </Layout>
)

export const wrapPageElement = ({ element }) => element

// export const wrapPageElement = ({ element, path, ...props }) => (
//   <AuthProvider
//     navigate={navigate}
//     auth0_domain="serverlessreactcourse.auth0.com"
//     auth0_client_id="pCO5jInBC1g4aCAtEfJNL6uftWSw40un"
//     auth0_params={{
//       scope: "openid profile email user_metadata",
//     }}
//     customPropertyNamespace="https://serverlessreact.dev"
//   >
//     <Router basepath="/">
//       {Object.keys(SCOPE_PAGE_MAP).map((path) => (
//         <ScopedRoute
//           path={path}
//           key={path}
//           scopes={SCOPE_PAGE_MAP[path]}
//           {...props}
//         >
//           {element}
//         </ScopedRoute>
//       ))}

//       {UNAUTH_PAGES.map((path) => (
//         <Default path={path} key={path} {...props}>
//           {element}
//         </Default>
//       ))}
//     </Router>
//   </AuthProvider>
// )
