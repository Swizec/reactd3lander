import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Flex, Box, Link, Button, Heading } from "rebass"
import { useColorMode } from "theme-ui"
import { useAuth } from "react-use-auth"
import { Image } from "./Image"

const modes = ["themed", "lite", "dark", "gray", "hack", "pink"]

const Burger = ({ size = 24 }) => (
  <Box
    as="svg"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentcolor"
    viewBox="0 0 24 24"
    sx={{
      display: "block",
      margin: 0,
    }}
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </Box>
)

const Dot = (props) => (
  <svg
    viewBox="0 0 32 32"
    width="24"
    height="24"
    fill="currentcolor"
    style={{
      display: "block",
    }}
  >
    <circle
      cx="16"
      cy="16"
      r="14"
      fill="none"
      stroke="currentcolor"
      strokeWidth="4"
    />
    <path
      d={`
        M 16 0
        A 16 16 0 0 0 16 32
        z
      `}
    />
  </svg>
)

const Login = () => {
  const { isAuthenticated, login, user } = useAuth()

  return isAuthenticated() ? (
    <Box mr={2}>
      Hi <strong>{user.nickname}</strong>
      <Box sx={{ display: ["none", "inline"] }}>,</Box>
      <Link href="/introduction/1" ml={1} sx={{ display: ["none", "inline"] }}>
        lessons
      </Link>
    </Box>
  ) : (
    <Link mr={2} variant="nav" href="#" onClick={login}>
      Student Login
    </Link>
  )
}

export default ({ nav, menu, setMenu, style }) => {
  const [mode, setMode] = useColorMode()
  const { isAuthenticated } = useAuth()

  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 128, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const cycleMode = (e) => {
    const i = (modes.indexOf(mode) + 1) % modes.length
    setMode(modes[i])
  }

  return (
    <Flex
      as="header"
      px={3}
      py={2}
      height={64}
      alignItems="center"
      bg="background"
      style={style}
      width="100%"
      sx={{
        position: "fixed",
        zIndex: 1100,
      }}
    >
      {isAuthenticated() && (
        <Button
          title="Toggle Menu"
          sx={{
            width: 32,
            height: 32,
            p: 1,
            cursor: "pointer",
          }}
          variant="transparent"
          onClick={(e) => {
            setMenu(!menu)
            if (menu || !nav.current) return
            const navlink = nav.current.querySelector("a")
            navlink.focus()
          }}
        >
          <Burger />
        </Button>
      )}
      <Link
        variant="nav"
        href="/"
        style={{
          width: "100%",
          maxWidth: 148,
        }}
      >
        <Image {...data.logo.childImageSharp} style={{ width: "100%" }} />
        {/* Reactfordataviz.com */}
      </Link>

      <Box mx="auto"></Box>

      <Login />
      <Button
        title="Change color mode"
        variant="transparent"
        sx={{
          width: 32,
          height: 32,
          p: 1,
          borderRadius: 99999,
          cursor: "pointer",
        }}
        onClick={cycleMode}
      >
        <Dot />
      </Button>
    </Flex>
  )
}
