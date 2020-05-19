import React from "react"
import { Box, Link } from "rebass"

export default props => (
  // <Box as="footer" py={5} color="background" bg="text">
    <Box
      textAlign="center"
      py={5}
      sx={{
        maxWidth: "wide",
        mx: "auto",
        px: 3,
      }}>
      © {new Date().getFullYear()}, Built by
        {` `}
        <Link
          href="https://swizec.com"
          variant="nav"
          style={{ textDecoration: "underline", color: '#f77b12' }}>
          
          Swizec
      </Link> with ❤️
      {/* Created by
      <Link
        href="https://swizec.com"
        variant="nav"
        style={{ textDecoration: "underline" }}
      >
        Swizec
      </Link>
      with ❤️
      <Link href="/" variant="nav">
        ServerlessReact.dev
      </Link> */}
    </Box>
  // </Box>
)
