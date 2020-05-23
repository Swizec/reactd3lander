const remarkPlugins = [require("remark-slug")]
const path = require("path")
const fs = require("fs")

module.exports = {
  siteMetadata: {
    title: `React for Data Visualization`,
    description: `Learn how to build scalable dataviz components your whole team can understand with React for Data Visualization.`,
    author: `@swizec`,
    coverImageStaticPath: 'metaimage.png',
    convertkit: {
      userId: '785fc7ef1f',
      formId: '772ba7c9ba',
      url: 'https://pages.convertkit.com/785fc7ef1f/772ba7c9ba',
    },
    articles: {
      title: `React for Data Visualization Articles`,
      description: `A monthly data visualization built with React, D3, and others`,
    },
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    // add a gatsby-source-filesystem entry for every article's images
    ...fs
    .readdirSync(`${__dirname}/src/pages/articles`)
    .map((path) => `${__dirname}/src/pages/articles/${path}`)
    .filter((path) => fs.lstatSync(path).isDirectory() && fs.readdirSync(path).length > 0)
    .map((path) => ({
      resolve: "gatsby-source-filesystem",
      options: {
        path,
      }
    })),
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: path.resolve('./src/templates/article.js')
        },
        remarkPlugins,
        plugins: ["gatsby-remark-images"],
        gatsbyRemarkPlugins: [
          "gatsby-remark-copy-linked-files",
          {
            resolve: "gatsby-remark-giphy",
            options: {
              giphyApiKey: process.env.GIPHY_API_KEY,
              useVideo: true,
              embedWidth: "80%",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              markdownCaptions: true,
              maxWidth: 890,
              linkImagestoOriginal: false,
              showCaptions: ["title", "alt"],
              withWebp: true,
              wrapperStyle: "text-align: center; font-style: italic",
              tracedSVG: {
                color: `lightgray`,
                optTolerance: 0.4,
                turdSize: 100,
                turnPolicy: "TURNPOLICY_MAJORITY",
              },
            },
          },
          {
            resolve: "@raae/gatsby-remark-oembed",
            options: {
              usePrefix: false,
              providers: {
                include: [
                  "YouTube",
                  "CodeSandbox",
                  "Codepen",
                  "Twitter",
                  "Instagram",
                ],
              },
            },
          },
        ],
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-twitter",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-1464315-23",
        head: false,
        anonymize: false,
        respectDNT: true,
      },
    },
    {
      resolve: "gatsby-plugin-facebook-pixel",
      options: {
        pixelId: "714190382013726",
      },
    },
    "gatsby-plugin-simple-analytics",
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

    // "gatsby-plugin-offline",
  ],
}
