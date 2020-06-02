import React from "react"
import Img from "gatsby-image"
import FadeIn from "react-lazyload-fadein"
import { Box } from "rebass"

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
export const LazyImage = ({ height, src, alt, title }) => (
  <Box textAlign="center" mt={2} sx={{ maxWidth: "700px" }}>
    <FadeIn height={height} duration={300}>
      {(onload) => (
        <img
          src={src}
          alt={alt}
          title={title}
          style={{ width: "100%" }}
          onLoad={onload}
        />
      )}
    </FadeIn>
  </Box>
)
/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */

export const Image = (props) => {
  let normalizedProps = props

  if (props.fluid && props.fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        margin: "0 auto",
      },
    }
  }

  return <Img {...normalizedProps} />
}

export const LinkImage = (props) => (
  <Box textAlign="center" mt={4}>
    <a href={props.link}>
      <Image {...props.image} />
    </a>
  </Box>
)
