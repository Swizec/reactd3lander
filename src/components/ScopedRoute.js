import React from "react"
import { useAuth } from "react-use-auth"
import { Box, Button, Link } from "rebass"
import { navigate } from "gatsby"

import { default as PleaseLoginCopy } from "./please-login"
import Head from "./head"

const PleaseLogin = (props) => {
  const { login } = useAuth()
  return (
    <>
      <Head {...props} />
      <main
        id="content"
        style={{
          textAlign: "center",
          margin: "auto auto",
        }}
      >
        Please{" "}
        <Link href="" onClick={login}>
          login
        </Link>{" "}
        to access this page
        <PleaseLoginCopy />
      </main>
    </>
  )
}

const PleasePurchase = (props) => {
  return (
    <>
      <Head {...props} />
      <main id="content">
        <Box textAlign="center">
          Please{" "}
          <Button onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
            purchase Reactfordataviz
          </Button>{" "}
          to access this page
        </Box>
      </main>
    </>
  )
}

export const ScopedRoute = ({ location, scopes, children }) => {
  const { isAuthenticated, isAuthorized } = useAuth()

  if (isAuthorized(scopes)) {
    return children
  } else if (isAuthenticated()) {
    return <PleasePurchase />
  } else {
    return <PleaseLogin />
  }
}
