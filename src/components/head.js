import React from "react"
import { Helmet } from "react-helmet"

export default props => {
  const title = [props.title, "React for Data Visualization"].filter(Boolean).join(" | ")
  const description =
    props.description ||
    "Learn how to build scalable dataviz components your whole team can understand with React for Data Visualization."
  const image = `https://reactfordataviz.com${props.image ||
    "/serverlessreact-cover.png"}`
  const url = `https://reactfordataviz.com${
    props.pageName !== undefined ? `/${props.pageName}` : ""
  }`

  return (
    <Helmet
      htmlAttributes={{
        lang: "en-us",
      }}
    >
      <title> {title} </title> <link rel="icon" href="/icon.png" />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@swizec" />
      <meta name="twitter:title" content={title} />{" "}
      <meta name="twitter:description" content={description} />{" "}
      <meta name="twitter:image" content={image} />
      <meta property="og:title" content={title} />{" "}
      <meta property="og:url" content={url} />{" "}
      <meta property="og:image" content={image} />
      <script src="https://gumroad.com/js/gumroad.js"> </script>{" "}
      <script src="https://gumroad.com/js/gumroad-embed.js"></script>
      <script>{` setTimeout(function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) {js = ce.call(d, "script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } },1000) `}</script>
    </Helmet>
  )
}
