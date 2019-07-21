const path = require('path')
const dotenvPath = path.resolve(process.cwd(), '.env.build')
require('dotenv').config({
    path: dotenvPath,
    debug: true
})

module.exports = {
    siteMetadata: {
        title: `React for Data Visualization`,
        description: `Learn how to build scalable dataviz components your whole team can understand with React for Data Visualization.`,
        author: `@swizec`,
        coverImageStaticPath: 'metaimage.png',
        convertkit: {
            userId: '7189e3bd4c',
            formId: 'b9fc6faf5d',
        },
        articles: {
            title: `React for Data Visualization Articles`,
            description: `A monthly data visualization built with React, D3, and others`
        }
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                // Add any options here
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/articles`,
                name: 'articles',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/content/pages`,
                name: 'pages',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [{
                        resolve: 'gatsby-remark-convertkit-form',
                        options: {
                            userId: '7189e3bd4c',
                            formId: 'b9fc6faf5d',
                        },
                    },
                    'gatsby-remark-youtube',
                    {
                        resolve: 'gatsby-remark-giphy',
                        options: {
                            giphyApiKey: process.env.GIPHY_API_KEY,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            showCaptions: true,
                            withWebp: true,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-responsive-iframe',
                        options: {
                            wrapperStyle: 'margin-bottom: 1.0725rem',
                        },
                    },
                    'gatsby-remark-prismjs',
                    'gatsby-remark-copy-linked-files',
                    'gatsby-remark-smartypants',
                    {
                        resolve: `@raae/gatsby-remark-oembed`,
                        options: {
                            // defaults to false
                            // usePrefix: true,
                            providers: {
                                // Important to exclude providers
                                // that adds js to the page.
                                // If you do not need them.
                                exclude: ['Reddit'],
                            },
                        },
                    },
                    'gatsby-remark-a11y-emoji',
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-plugin-facebook-pixel',
            options: {
                pixelId: '714190382013726',
            },
        },
        {
            resolve: 'gatsby-plugin-google-analytics',
            options: {
                trackingId: 'UA-1464315-23',
                head: false,
                anonymize: false,
                respectDNT: true,
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        // 'gatsby-plugin-offline',
    ],
}