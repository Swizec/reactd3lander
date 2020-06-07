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
  "/thankyou/",
  "/thanks-basics",
  "/thanks-basics/",
  "/thanks-extra",
  "/thanks-extra/",
  "/thanks-full",
  "/thanks-full/",
]

const Default = ({ children }) => children

export const wrapPageElement = ({ element, props }) => (
  <AuthProvider
    navigate={navigate}
    auth0_domain="serverlessreactcourse.auth0.com"
    auth0_client_id="pCO5jInBC1g4aCAtEfJNL6uftWSw40un"
    auth0_params={{
      scope: "openid profile email user_metadata",
    }}
    customPropertyNamespace="https://serverlessreact.dev"
  >
    <Layout {...props}>
      <Router basepath="/">
        <ScopedRoute path="/introduction/*" scopes={["RDV_Basic"]}>
          {element}
        </ScopedRoute>
        {UNAUTH_PAGES.map((path) => (
          <Default path={path} key={path}>
            {element}
          </Default>
        ))}
      </Router>
    </Layout>
  </AuthProvider>
)
