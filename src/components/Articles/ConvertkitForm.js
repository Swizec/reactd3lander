import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

function convertkitSnippet({ userId, formId }) {
  const snippet = `
  <script async
    data-uid="${userId}"
    src="https://f.convertkit.com/${userId}/${formId}.js">
  </script>`
  return snippet
}

function ConvertkitForm({ userId, formId }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: convertkitSnippet({
                userId: userId || data.site.siteMetadata.convertkit.userId,
                formId: formId || data.site.siteMetadata.convertkit.formId,
              }),
            }}
          />
        )
      }}
    />
  )
}

export default ConvertkitForm

const detailsQuery = graphql`
  query convertkitFormQuery {
    site {
      siteMetadata {
        convertkit {
          userId
          formId
        }
      }
    }
  }
`
