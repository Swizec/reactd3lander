const _ = require('lodash')
const fp = require('lodash/fp')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const sizeOf = require('image-size')

// # pure functions

function getCollection(mdEdge) {
  return mdEdge.node.fields.collection
}

// # effectful functions

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const articleTemplate = path.resolve('./src/templates/article.js')
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                collection
              }
              frontmatter {
                title
                image {
                  publicURL
                  childImageSharp {
                    original {
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const mds = result.data.allMarkdownRemark.edges

    // create articles pages
    {
      const mdEdges = fp.filter(md => getCollection(md) === 'articles')(mds)
      mdEdges.forEach((mdEdge, index) => {
        const previous =
          index === mdEdges.length - 1 ? null : mdEdges[index + 1].node
        const next = index === 0 ? null : mdEdges[index - 1].node

        createPage({
          path: mdEdge.node.fields.slug,
          component: articleTemplate,
          context: {
            slug: mdEdge.node.fields.slug,
            collection: getCollection(mdEdge),
            previous,
            next,
          },
        })
      })
    }

    // create pages pages
    {
      const mdEdges = fp.filter(md => getCollection(md) === 'pages')(mds)
      mdEdges.forEach((mdEdge, index) => {
        const previous =
          index === mdEdges.length - 1 ? null : mdEdges[index + 1].node
        const next = index === 0 ? null : mdEdges[index - 1].node

        createPage({
          path: mdEdge.node.fields.slug,
          component: articleTemplate,
          context: {
            slug: mdEdge.node.fields.slug,
            collection: getCollection(mdEdge),
            previous,
            next,
          },
        })
      })
    }

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  const nodeInternalType = node.internal.type

  if (nodeInternalType === 'Site') {
    // HACK: mimic gatsby-remark-image schema
    // image {
    //   publicURL
    //   childImageSharp {
    //     original {
    //       width
    //       height
    //     }
    //   }
    // }
    const { coverImageStaticPath } = node.siteMetadata
    const siteCoverImage = coverImageStaticPath && {
      publicURL: `/${coverImageStaticPath}`,
      childImageSharp: {
        original: sizeOf(path.resolve('static', coverImageStaticPath)),
      },
    }
    createNodeField({
      node,
      name: 'image',
      value: siteCoverImage,
    })
  }

  if (nodeInternalType === 'MarkdownRemark') {
    const parent = getNode(_.get(node, 'parent'))
    const collection = _.get(parent, 'sourceInstanceName')
    createNodeField({
      node,
      name: 'collection',
      value: collection,
    })
    console.log({ collection })

    // Page paths are root-relative.
    // Article paths have the `/articles/` prefix.
    if (collection === 'pages') {
      const relativePath = createFilePath({ node, getNode })
      console.log({ relativePath })

      createNodeField({
        node,
        name: 'slug',
        value: relativePath,
      })
    } else {
      const relativePath = createFilePath({ node, getNode })
      console.log({ relativePath })

      createNodeField({
        node,
        name: 'slug',
        value: `/${collection}${relativePath}`,
      })
    }
  }
}
