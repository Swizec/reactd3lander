import React from "react"
import { Helmet } from "react-helmet"
import slugify from "slugify"
import defaultThumb from "../images/metaimage.png"

function getSocialCard({ title, image }) {
  if (image) {
    const ext = image.split(".").pop()

    // URL guaranteed by src/gatsby-remark-social-card
    return `/social-cards/${slugify(title)}.${ext}`
  } else {
    return ""
  }
}

export default (props) => {
  const title = [props.title, "React for Data Visualization"]
    .filter(Boolean)
    .join(" | ")

  const description =
    props.description ||
    "Learn how to build scalable dataviz components your whole team can understand with React for Data Visualization."
  const socialImage = getSocialCard({ title: props.title, image: props.image})
  const image = `https://reactfordataviz.com${socialImage || defaultThumb}`
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
      <script
        src="https://f.convertkit.com/785fc7ef1f/772ba7c9ba.js"
        defer
        async
      />
      <script
        async
        defer
        data-uid="c3e0a312c3"
        src="https://swizec-llc.ck.page/c3e0a312c3/index.js"
      ></script>
      {props.showRightMessage && (
        <script type="text/javascript">{`
                    (function(p, a, n, d, o, b, c) {
                        o = n.createElement('script'); o.type = 'text/javascript'; o.async = true; o.src = 'https://tag.rightmessage.com/'+p+'.js';
    b = n.getElementsByTagName('script')[0]; d = function(h, u, i) { var c = n.createElement('style'); c.id = 'rmcloak'+i;
        c.type = 'text/css'; c.appendChild(n.createTextNode('.rmcloak'+h+'{visibility:hidden}.rmcloak'+u+'{display:none}'));
                    b.parentNode.insertBefore(c, b); return c; }; c = d('', '-hidden', ''); d('-stay-invisible', '-stay-hidden', '-stay');
    setTimeout(o.onerror = function() {c.parentNode && c.parentNode.removeChild(c); }, a); b.parentNode.insertBefore(o, b);
                })('188781816', 20000, document);
      `}</script>
      )}
    </Helmet>
  )
}
