import React, { useEffect } from "react"
import styled from '@emotion/styled'
import { Box } from "rebass"

const Typeform = ({ url }) => {
  useEffect(() => {
    // Taken from typeform
    ;(function() {
      var /*qs,*/
        js,
        q,
        // s,
        d = document,
        gi = d.getElementById,
        ce = d.createElement,
        gt = d.getElementsByTagName,
        id = "typef_orm",
        b = "https://embed.typeform.com/"
      if (!gi.call(d, id)) {
        js = ce.call(d, "script")
        js.id = id
        js.src = b + "embed.js"
        q = gt.call(d, "script")[0]
        q.parentNode.insertBefore(js, q)
      }
    })()
  }, [])

  return (
    <Box
      className="typeform-widget"
      // data-url="https://swizecteller.typeform.com/to/AJgFM5"
      data-url={url}
      data-transparency="50"
      data-hide-headers="true"
      data-hide-footer="true"
      sx={{ height: 500 }}
    ></Box>
  )
}

export const TypeformLink = ({ url }) => (
  <Box textAlign="center">
    <TypeFormStyledLink
      className="typeform-share button"
      href={url}
      data-mode="popup"
      target="_blank">
        Answer 2 quick questions
    </TypeFormStyledLink>
  </Box>
)


const TypeFormStyledLink = styled.a`
    display: inline-block;
    text-decoration: none;
    background-color: #267ddd;
    color: white;
    cursor: pointer;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    margin: 0;
    height: 50px;
    padding: 0px 33px;
    border-radius: 25px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

export default Typeform
