import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql } from "gatsby";
import Image from "../widgets/Image";

const Wrapper = styled.div`
    .gatsby-image-wrapper {
        width: 100px;
        padding: 5px;
        max-height: 80px;
        display: inline-block;
    }
`;

const AboutMeFeatures = images => (
    <Wrapper>
        {Object.values(images).map((image, i) => (
            <Image {...image.childImageSharp} key={i} />
        ))}
    </Wrapper>
);

export default () => (
    <StaticQuery
        query={graphql`
            query {
                about1: file(relativePath: { eq: "publications/About1.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about2: file(relativePath: { eq: "publications/About2.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about3: file(relativePath: { eq: "publications/About3.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about4: file(relativePath: { eq: "publications/About4.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about5: file(relativePath: { eq: "publications/About5.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about6: file(relativePath: { eq: "publications/About6.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about7: file(relativePath: { eq: "publications/About7.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about8: file(relativePath: { eq: "publications/About8.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about9: file(relativePath: { eq: "publications/About9.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about10: file(
                    relativePath: { eq: "publications/About10.png" }
                ) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about11: file(
                    relativePath: { eq: "publications/About11.png" }
                ) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about12: file(
                    relativePath: { eq: "publications/About12.png" }
                ) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about13: file(
                    relativePath: { eq: "publications/About13.png" }
                ) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
                about14: file(
                    relativePath: { eq: "publications/About14.png" }
                ) {
                    childImageSharp {
                        fluid(maxWidth: 100, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
            }
        `}
        render={data => <AboutMeFeatures {...data} />}
    />
);
