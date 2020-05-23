import React from 'react'
import styled from '@emotion/styled'
import ArticleCTA from './ArticleCTA'
import ConvertkitForm from './ConvertkitForm'
import AboutMe from '../Blocks/AboutMe'

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
