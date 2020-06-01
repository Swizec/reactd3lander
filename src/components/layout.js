import React, { useState, useRef } from "react"
import { Global } from "@emotion/core"
import styled from "@emotion/styled"
import { Box, Flex, Button, Link } from "rebass"
import { Sidenav, Pagination } from "@theme-ui/sidenav"
import { useAuth } from "react-use-auth"
import { navigate } from "gatsby"

import Head from "./head"
import SkipLink from "./skip-link"
import Header from "./header"
import Footer from "./footer"
import Nav from "./nav"
import { default as PleaseLoginCopy } from "./please-login"
import { isArticlePage, currentLocation } from "../util"

import Reactions from "./reactions"
import ArticleFooter from "./Articles/ArticleFooter"
import ArticleHeader from "./Articles/ArticleHeader"

const Sidebar = (props) => {
  return (
    <Flex>
      <Box
        as={Sidenav}
        ref={props.nav}
        open={props.open}
        onClick={(e) => {
          props.setMenu(false)
        }}
        onBlur={(e) => {
          props.setMenu(false)
        }}
        onFocus={(e) => {
          props.setMenu(true)
        }}
        sx={{
          width: [256, 256, 320],
          flex: "none",
          px: 3,
          mt: [64, 0],
          pb: 3,
          "li > ul > li > a": {
            pl: "24px",
          },
        }}
      >
        <Nav />
      </Box>
      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          maxWidth: 768,
          minHeight: "calc(100vh - 64px)",
          mx: "auto",
          px: [3, 4],
          pb: 5,
        }}
      >
        {props.children}
        <Reactions page={props.uri} />
        <Nav
          pathname={props.location.pathname}
          components={{
            wrapper: Pagination,
          }}
        />
      </Box>
    </Flex>
  )
}

const Content = (props) => {
  let content

  if (props.isArticle) {
    let header
    if (props.pageContext.frontmatter) {
      const {
        title,
        description,
        lastUpdated,
        image,
        date,
      } = props.pageContext.frontmatter
      header = (
        <ArticleHeader
          title={title}
          description={description}
          lastUpdated={lastUpdated}
          date={date}
          image={image}
        />
      )
    } else {
      header = <Head {...props} />
    }

    content = (
      <ArticleWrapper>
        {header}
        <main id="content">
          {props.children}
          <ArticleFooter />
        </main>
      </ArticleWrapper>
    )
  } else {
    content = (
      <>
        <Head {...props} />
        <main id="content">{props.children}</main>
      </>
    )
  }

  return !props.fullwidth || props.menu ? (
    <Sidebar
      {...props}
      nav={props.nav}
      open={props.menu}
      setMenu={props.setMenu}
    >
      {content}
    </Sidebar>
  ) : (
    <>{content}</>
  )
}

const ArticleWrapper = styled.div`
  max-width: 700px;
  margin: 7rem auto;
  padding: 0 2rem;
`

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

export default (props) => {
  const allowUnauth =
    isArticlePage(props) || UNAUTH_PAGES.includes(currentLocation(props))
  const fullwidth = allowUnauth
  const [menu, setMenu] = useState(!allowUnauth)
  const nav = useRef(null)
  const { isAuthenticated, isAuthorized, user } = useAuth()

  return (
    <Box
      sx={{
        variant: "styles.root",
      }}
    >
      <SkipLink />
      <Global
        styles={{
          body: { margin: 0 },
        }}
      />
      <Header fullwidth={fullwidth} menu={menu} setMenu={setMenu} nav={nav} />
      <div style={{ paddingTop: "64px" }}>
        {allowUnauth ||
        isAuthorized(["RDV_Basic", "RDV_Full", "RDV_AllExtras"]) ? (
          <Content
            {...props}
            fullwidth={fullwidth}
            menu={menu}
            setMenu={setMenu}
            isArticle={isArticlePage(props)}
            nav={nav}
            showRightMessage={
              !isAuthorized(["RDV_Basic", "RDV_Full", "RDV_AllExtras"])
            }
          />
        ) : isAuthenticated() ? (
          <PleasePurchase />
        ) : (
          <PleaseLogin />
        )}
      </div>
      <Footer />
    </Box>
  )
}
