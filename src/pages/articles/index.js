import React from 'react'
import { graphql } from "gatsby"
import styled from '@emotion/styled'
import { ArticleListing } from "../../components/Articles/ArticleListing"
import Head from '../../components/head'
import ConvertkitForm from '../../components/Articles/ConvertkitForm'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        articles {
          title
          description
        }
        author
      }
    }
    allSitePage(
      filter: { path: { regex: "/articles/.+/" } }
      sort: { fields: context___frontmatter___date, order: DESC }
    ) {
      nodes {
        path
        context {
          frontmatter {
            title
            description
            date
          }
        }
      }
    }
  }
`

const Wrapper = styled.div`
  max-width: 700px;
  margin: 0rem auto;
  padding: 0 1rem;

  a {
    color: #f77b12;
  }

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

  @media (min-width: 940px) {
    padding: 0 2rem;
  }
`

const HeroTitle = styled.h1 `
  width: 100%;
  margin: 0rem auto 1rem auto;
  text-align: center;
  font-size: 2.5em;
`

const ArticlesWrapper = styled.div`
  margin-top: 2rem;
`

const ArticlePage = props => {
  const { title, description } = props.data.site.siteMetadata.articles

    return (
      <>
        <Head title={title} description={description} />
        <Wrapper>
          <HeroTitle>React for Dataviz</HeroTitle>
          <p>
            A monthly data visualization built with React, D3, and others.
            Livecoded last Sunday of the month.{' '}
            <a href="https://www.youtube.com/channel/UCoyHgaeLLI7Knp7LDHOwZMw">
              Join live
            </a>{' '}
            or subscribe to the newsletter{' '}
            <span role="img" aria-label="heart">
              {' '}
              💌
            </span>
            .
          </p>
          <ConvertkitForm />
          <ArticlesWrapper>
            {props.data.allSitePage.nodes.map((props, i) => (
              <ArticleListing {...props} key={i} />
            ))}
          </ArticlesWrapper>
        </Wrapper>
      </>
    )
}


export default ArticlePage
