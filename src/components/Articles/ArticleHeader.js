import React from 'react'
import { graphql } from 'gatsby'
import { useStaticQuery } from 'gatsby';
import { Box } from "rebass";
import styled from '@emotion/styled'
import Head from '../head'

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        convertkit {
            url
        }
      }
    }
  }
`

const ArticleHeader = ({ title, description, date, lastUpdated, image }) => {

    const data = useStaticQuery(pageQuery)

    const convertkitURL  = data.site.siteMetadata.convertkit.url

    return (
        <Box sx={{ marginBottom: '2rem' }}>
            <Head title={title} description={description} image={image} />
            <HeroTitle style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                {title}
            </HeroTitle>
            <SubtitleWrapper>
                <DateText date={date} lastUpdated={lastUpdated} />
                <em>
                &nbsp;
                <span role="img" aria-label="finger-right">
                    👉{' '}
                </span>{' '}
                livestreamed every last Sunday of the month.{' '}
                <a href="https://www.youtube.com/channel/UCoyHgaeLLI7Knp7LDHOwZMw">
                    Join live
                </a>{' '}
                or{' '}
                <a href={convertkitURL}>
                    subscribe by email{' '}
                    <span role="img" aria-label="heart">
                    💌
                    </span>
                </a>
                </em>
            </SubtitleWrapper>
        </Box>
    )
}

const HeroTitle = styled.h1`
    width: 100%;
    margin: 0rem auto 1rem auto;
    text-align: center;
    font-size: 2.5em;
`

const SubtitleWrapper = styled.p`

    a {
        color: #f77b12;
    }
`

function DateText({ date, lastUpdated }) {
    const time = date === lastUpdated ? date : lastUpdated

    const formattedTime = new Date(time);
    const formattedDate = formattedTime.toLocaleDateString('en-US', {
       month: 'long', year: 'numeric'
    }).replace(/ /g, ' ');

    return <em>Last updated: {formattedDate}</em>
}

export default ArticleHeader