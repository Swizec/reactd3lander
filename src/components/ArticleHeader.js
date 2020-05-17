import React from 'react'
import { Box } from "rebass";
import styled from '@emotion/styled'

const ArticleHeader = ({ title }) => (
    <Box>
        <HeroTitle style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            {title}
        </HeroTitle>
        <p>
            {/* <DateText {...date} /> */}
            {/* <em>
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
            </em> */}
        </p>
    </Box>
)

const HeroTitle = styled.h1`
    width: 100%;
    margin: 0rem auto 1rem auto;
    text-align: center;
    font-size: 2.5em;
`

// function DateText({ date, lastUpdated }) {
//     const time = date === lastUpdated ? date : lastUpdated
//     return <em>Last updated: {time}</em>
// }

export default ArticleHeader