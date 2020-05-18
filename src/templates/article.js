import React from 'react'
import styled from '@emotion/styled'
import ArticleHeader from '../components/Articles/ArticleHeader'


const ArticlePage = (props) => {
    console.log("PROPS", props.pageContext.frontmatter)
    return (
        <ArticleWrapper>
            <ArticleHeader 
                title={props.pageContext.frontmatter.title}
                description={props.pageContext.frontmatter.description}
                date={props.pageContext.frontmatter.date}
                lastUpdated={props.pageContext.frontmatter.lastUpdated} />
            {props.children}
        </ArticleWrapper>
    )
}

const ArticleWrapper = styled.div`
    max-width: 700px;
    margin: 7rem auto;
    padding: 0 2rem;
`

export default ArticlePage
