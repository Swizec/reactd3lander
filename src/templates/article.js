import React from 'react'
import styled from '@emotion/styled'
import ArticleHeader from '../components/Articles/ArticleHeader'
import { isArticlePage } from '../util'

const ArticlePage = (props) => {
    if (!props.location) return (
        <>
            {props.children}
        </>
    )
    const isArticle = isArticlePage(props)

    return (
        <>
            {isArticle ? (
                <ArticleWrapper>
                    <ArticleHeader 
                        title={props.pageContext.frontmatter.title || "React for data visualization"}
                        description={props.pageContext.frontmatter.description}
                        date={props.pageContext.frontmatter.date}
                        lastUpdated={props.pageContext.frontmatter.lastUpdated} />
                    {props.children}
                </ArticleWrapper>
            ) : (
                <>
                    {props.children}
                </>
            )}
        </>
    )
}

const ArticleWrapper = styled.div`
    max-width: 700px;
    margin: 7rem auto;
    padding: 0 2rem;
`

export default ArticlePage
