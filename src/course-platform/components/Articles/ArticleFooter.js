import React from 'react'
import styled from '@emotion/styled'
import ArticleCTA from '../../../components/Articles/ArticleCTA'
import AboutMe from '../Blocks/AboutMe'
import { ConvertkitForm } from 'course-platform'

const Wrapper = styled.div`
    max-width: 700px;
    margin: 0rem auto;
    padding: 0 1rem;

    @media (min-width: 940px) {
        padding: 0 2rem;
    }
`

const ArticleFooter = () => (
    <Wrapper>
        <hr />
        <ArticleCTA />
        <ConvertkitForm />
        <AboutMe />
    </Wrapper>
)

export default ArticleFooter
