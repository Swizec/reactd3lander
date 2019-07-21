import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, keywords, title, includeTypeform }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={title}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: `React for Data Visualization`,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `og:image`,
                content: `https://reactd3lander.netlify.com/static/metaimage-92d136087bd1db37d514c61acaa84e1b.png`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:image:src`,
                content: `https://reactd3lander.netlify.com/static/metaimage-92d136087bd1db37d514c61acaa84e1b.png`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: `React for Data Visualization`,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          >
            <script src="https://f.convertkit.com/ckjs/ck.5.js" defer async />
            <script src="https://gumroad.com/js/gumroad.js" defer async />
            {includeTypeform ? (
              <script>{` (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){js = ce.call(d, "script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() `}</script>
            ) : null}
            <script type="text/javascript">{`
                        <!-- SegMetrics -->
                            var _segq = _segq || [];
                        var _segs = _segs || {};
                        _segs.integration = '1763';
                        _segs.link = ['swizec.com', 'reactfordataviz.com', 'es6cheatsheet.com', 'es2017.io', 'es2018.io'];
                        (function () {
                            var dc = document.createElement('script');
                            dc.type = 'text/javascript';
                            dc.async = true;
                            dc.src = '//tag.segmetrics.io/seg.js';
                            var s = document.getElementsByTagName('script')[0];
                            s.parentNode.insertBefore(dc, s);
                        })(); 
                        `}</script>
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
