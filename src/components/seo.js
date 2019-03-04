import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, keywords, title }) {
    return (
        <StaticQuery
            query={detailsQuery}
            render={data => {
                const metaDescription =
                    description || data.site.siteMetadata.description;

                return (
                    <Helmet
                        htmlAttributes={{
                            lang
                        }}
                        title={title}
                        titleTemplate={data.site.siteMetadata.title}
                        meta={[
                            {
                                name: `description`,
                                content: metaDescription
                            },
                            {
                                property: `og:title`,
                                content: `React for Data Visualization`
                            },
                            {
                                property: `og:description`,
                                content: metaDescription
                            },
                            {
                                property: `og:type`,
                                content: `website`
                            },
                            {
                                name: `og:image`,
                                content: `https://reactd3lander.netlify.com/static/metaimage-92d136087bd1db37d514c61acaa84e1b.png`
                            },
                            {
                                name: `twitter:card`,
                                content: `summary`
                            },
                            {
                                name: `twitter:image:src`,
                                content: `https://reactd3lander.netlify.com/static/metaimage-92d136087bd1db37d514c61acaa84e1b.png`
                            },
                            {
                                name: `twitter:creator`,
                                content: data.site.siteMetadata.author
                            },
                            {
                                name: `twitter:title`,
                                content: `React for Data Visualization`
                            },
                            {
                                name: `twitter:description`,
                                content: metaDescription
                            }
                        ]
                            .concat(
                                keywords.length > 0
                                    ? {
                                          name: `keywords`,
                                          content: keywords.join(`, `)
                                      }
                                    : []
                            )
                            .concat(meta)}
                    >
                        <script
                            src="https://f.convertkit.com/ckjs/ck.5.js"
                            defer
                            async
                        />
                        <script
                            src="https://gumroad.com/js/gumroad.js"
                            defer
                            async
                        />
                    </Helmet>
                );
            }}
        />
    );
}

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    keywords: []
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.array,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired
};

export default SEO;

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
`;
