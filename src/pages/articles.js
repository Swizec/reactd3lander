import { graphql, Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'
import DateText from '../components/date-text'
import About from '../widgets/About'
import ConvertkitForm from '../widgets/ConvertkitForm'
import Image from 'gatsby-image'
import { isMobile } from 'react-device-detect'

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0rem auto;
  padding: 0 ${isMobile ? '1rem' : '2rem'};

  img {
    display: block;
    max-width: 100%;
    margin: auto;
  }

  iframe {
    max-width: 100%;
  }

  h1 {
    text-align: center;
  }

  form h1 {
    margin: inherit;
  }

  pre {
    margin-left: -4rem !important;
    margin-right: -4rem !important;
  }
`

const ArticleRow = styled.div`
  padding-top: 2em;
`

const Article = ({ fields, frontmatter }) => {
  const { title, description, image } = frontmatter,
    { slug } = fields
  return (
    <ArticleRow>
      <h2>
        <Link to={slug}>{title}</Link>
      </h2>
      <p>{description}</p>
      <Image fluid={image.childImageSharp.fluid} />
    </ArticleRow>
  )
}

const ArticleTemplate = props => {
  const { title, description } = props.data.site.siteMetadata.articles
  const articles = props.data.allMarkdownRemark.edges
    .map(e => e.node)
    .filter(a => a.frontmatter.title !== '')

  return (
    <Layout location={props.location} title={title}>
      <SEO description={description} pathname="/articles" title={title} />
      <Wrapper>
        <h1>React for Dataviz</h1>
        <p>
          A monthly data visualization built with React, D3, and others.
          Livecoded last Sunday of the month.{' '}
          <a href="https://www.youtube.com/channel/UCoyHgaeLLI7Knp7LDHOwZMw">
            Join live
          </a>{' '}
          or subscribe to the newsletter 💌.
        </p>
        <ConvertkitForm />
        {articles.map(article => (
          <Article key={article.id} {...article} />
        ))}
        <hr />
        <About />
      </Wrapper>
    </Layout>
  )
}

export default ArticleTemplate

export const pageQuery = graphql`
  query Articles {
    site {
      siteMetadata {
        articles {
          title
          description
        }
        author
      }
    }
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
            lastUpdated(formatString: "MMMM DD, YYYY")
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt(pruneLength: 160)
          fields {
            slug
          }
        }
      }
    }
  }
`
