const remarkPlugins = [require("remark-slug")]
const path = require("path")
const fs = require("fs")

module.exports = {
  siteMetadata: {
    title: `React for Data Visualization`,
    description: `Learn how to build scalable dataviz components your whole team can understand with React for Data Visualization  - updated for 2020.`,
    author: `@swizec`,
    siteUrl: `https://reactfordataviz.com`,
    courseFirstLesson: `/introduction/1`,
    convertkit: {
      userId: "785fc7ef1f",
      formId: "772ba7c9ba",
      url: "https://pages.convertkit.com/785fc7ef1f/772ba7c9ba",
    },
    articles: {
      title: `React for Dataviz`,
      description: `
        A monthly data visualization built with React, D3, and others.
        Livecoded last Sunday of the month. 
        <a href="https://www.youtube.com/channel/UCoyHgaeLLI7Knp7LDHOwZMw">
          Join live
        </a>
        or subscribe to the newsletter 💌
      `,
      titleSeo: `React for Data Visualization Articles`,
      descriptionSeo: `A monthly data visualization built with React, D3, and others`,
    },
  },
  plugins: [
    {
      resolve: "course-platform",
      options: {
        trakingId: "UA-1464315-23",
        facebookPixel: "714190382013726"
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "React for Data Visualization",
        short_name: "React for Data Visualization",
        description:
          "Learn how to build scalable dataviz components your whole team can understand with React for Data Visualization",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#FF002B",
        display: "standalone",
        icon: "./static/icon.png",
      },
    },
  ],
}
