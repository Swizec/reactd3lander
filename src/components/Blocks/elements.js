import React from "react"
import { Box, Heading, Text, Image } from "rebass"
import { Link } from "gatsby"
import slugify from "slugify"
import FadeIn from "react-lazyload-fadein";

export const Container = props => (
  <Box
    {...props}
    sx={{
      maxWidth: "wide",
      mx: "auto",
      px: 4,
      textAlign: "left",
      ...props.sx,
    }}
  />
)

export const Banner = props => (
  <Box
    {...props}
    sx={{
      color: "background",
      bg: "text",
    }}
  >
    <Box
      sx={{
        // '*': { outline: '1px solid rgba(0, 255, 255, 0.5)', },
        display: "flex",
        flexDirection: "column",
        maxWidth: "wide",
        minHeight: "calc(100vh - 64px)",
        mx: "auto",
        px: 4,
        py: [4, 5],
        h1: {
          variant: "text.caps",
          fontSize: 3,
        },
        pre: {
          p: 0,
          mb: 0,
          bg: "transparent",
        },
      }}
    >
      {props.children}
    </Box>
  </Box>
)

export const LogoGrid = props => (
  <Box
    {...props}
    sx={{
      display: "grid",
      gridGap: 3,
      gridTemplateColumns: ["auto", "auto", "1fr 2fr 1fr"],
      alignItems: "center",
    }}
  />
)

export const Grid = ({ width = 256, gap = 4, ...props }) => (
  <Box
    {...props}
    sx={{
      ul: {
        listStyle: "none",
        p: 0,
        display: "grid",
        gridGap: gap,
        gridTemplateColumns: [
          "auto",
          `repeat(auto-fit, minmax(${width}px, 1fr))`,
        ],
      },
      ...props.sx,
    }}
  />
)

export const NavGrid = props => (
  <Box
    {...props}
    sx={{
      ul: {
        listStyle: "none",
        p: 0,
        display: "grid",
        gridGap: 3,
        gridTemplateRows: [`repeat(9, 1fr)`, `repeat(5, 1fr)`],
        gridTemplateColumns: ["repeat(2, 1fr)", "repeat(4, 1fr)"],
        gridAutoFlow: ["dense", "column"],
        counterReset: "nav-grid",
      },
      li: {
        fontWeight: "bold",
        fontSize: 0,
        variant: "text.caps",
        counterIncrement: "nav-grid",
        "::before": {
          content: "counter(nav-grid)",
          display: "inline-block",
          width: 16,
          pr: [1, 2, 3],
        },
      },
      a: {
        color: "inherit",
        textDecoration: "none",
        transition: "color .2s ease-out",
        ":hover,:focus": {
          color: "primary",
        },
      },
    }}
  />
)

export const Title = props => {
  let fontSize = [4, 5, 6]

  if (props.h2) {
    fontSize = [3, 4, 5]
  } else if (props.h3) {
    fontSize = [3, 4, 4]
  }

  const title = props.children.replace(/^[#]+/, ""),
    slug = slugify(title.toLowerCase())

  return (
    <Text>
      <Heading
        {...props}
        width={[1, 1, 2 / 3]}
        fontSize={fontSize}
        mt={[4, 4, 5]}
        mb={[2, 3, 3.5]}
        sx={{ textAlign: "center", margin: "auto", ...props.sx }}
        id={slug}
      >
        <Link
          to={`#${slug}`}
          style={{
            color: "inherit",
            textDecoration: "none",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          {title}
        </Link>
      </Heading>
    </Text>
  )
}

// export const JumpToCourse = () => (
//   <Box textAlign="center" mt={2}
//     sx={{

//     }}>
//     <a href="#pricing">
//       <Button>👇 Jump into ReactForDataviz 👇</Button>
//     </a>
//   </Box>
// )

export const Testimonial = ({name, company, quote, image}) => (
  <Box textAlign="center" mt={2}
    sx={{
      display: 'grid',
      gridGap: '10px',
      alignItems: 'center',
      justifyItems: 'center',
      gridTemplateColumns: '1fr',
      margin: '2rem auto',
      maxWidth: '600px',
    }}>
    <FadeIn height={340} sx={{width: '100%'}}>
      {onload => (
      <>
        <Box
          sx={{
            margin: '1rem auto',
            width: '80%',
            padding: '20px',
            textAlign: 'center',
            background: '#fff',
            boxShadow: '0 5px 25px 0 rgba(0, 0, 0, 0.25)',
            borderRadius: '20px',
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontStyle: 'italic',
            lineHeight: '28px',
            fontSize: '16px',
            transition: 'all 0.6s ease',
            verticalAlign: 'top',
          }}>
            {quote}
        </Box>
        <Image
          src={image}
          onLoad={onload}
          alt={`${name} testimonial`}
          sx={{
            borderRadius: '50%',
            display: 'inline-block',
            height: '110px',
            margin: '1rem auto',
            verticalAlign: 'middle'
          }}
        />

        <Box
          sx={{
            color: '#384047',
            fontAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            {name}
        </Box>

        <Box
          sx={{
            color: '#94a3a8',
            fontAlign: 'center',
            fontSize: '14px',
            fontWeight: '200'
          }}>
            {company}
        </Box>
      </>
      )}
    </FadeIn>
  </Box>
  
)