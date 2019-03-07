import React, { Component } from "react";
import styled from "styled-components";
import AboutMeFeatures from "../widgets/AboutMeFeatures";
import { StaticQuery, graphql } from "gatsby";

import Image from "../widgets/Image";
import { Title } from "../styles";

const Wrapper = styled.div`
    max-width: 700px;
    margin: 7rem auto;
    padding: 0 2rem;
`;
const WrapperGroup = styled.div`
    h1 {
        text-align: center;
    }
`;

const WrapperImage = styled.div`
    img {
        margin: 0 auto;
        display: block;
        height: 300px;
        grid-area: Picture;
    }
    @media (max-width: 940px) {
        img {
            height: 200px;
        }
    }
`;

const WrapperCopy = styled.div`
    grid-area: Copy;
`;
const Features = styled.div`
    text-align: center;
    grid-area: Feat;
`;

const Content = styled.div`
    margin: 0 0rem;
     {
        /*display: grid;
  align-items: top;
  justify-items: center;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'Picture Copy'
    '. Feat';
  @media (max-width: 940px) {
    align-items: center;
    justify-items: center;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      'Picture'
      'Copy'
      'Feat';
  }*/
    }
`;

const About = ({ swizec }) => (
    <Wrapper>
        <Title>About the Author</Title>
        <WrapperGroup>
            <Content>
                <Image {...swizec.childImageSharp} />
                <WrapperCopy>
                    <p>
                        Hi, I’m <strong>Swizec Teller</strong>. I help{" "}
                        <strong>coders become software engineers.</strong>
                    </p>

                    <p>
                        Over the years I've helped over{" "}
                        <strong>10,000 engineers</strong> hone their craft.
                        People from Uber, Oracle, Apple and many others have
                        used my <strong>books, articles, and talks</strong> to
                        improve their technical skills, get promotions, change
                        jobs, and ship their products faster.
                    </p>

                    <p>
                        Story time{" "}
                        <span role="img" aria-label="point">
                            👇
                        </span>
                    </p>

                    <p>
                        React+D3 started as a bet in April 2015. A friend wanted
                        to learn React and challenged me to publish a book. A
                        month later React+D3 launched with 79 pages of hard
                        earned knowledge.
                    </p>

                    <p>
                        In April 2016 it became <strong>React+D3</strong> ES6.
                        117 pages and growing beyond a single big project it was
                        a huge success. I kept going, started live streaming,
                        and publishing videos on YouTube.
                    </p>

                    <p>
                        It's 2017 now and after 10 months of work,{" "}
                        <strong>React+D3v4 is the best book</strong>
                        I've ever written. 249 pages, many examples, much code
                        to play with. It's designed like a step-by-step course
                        so you can{" "}
                        <strong>follow along without breaking a sweat.</strong>
                    </p>

                    <p>
                        I based React+D3v4 on{" "}
                        <strong>20 years of experience</strong> with learning
                        how to code <strong>on my own</strong>, reading blogs
                        and articles, listening to <strong>professors</strong>,
                        and <strong>working with mentors</strong>. Yes, that
                        means I wrote my{" "}
                        <strong>first program when I was 9</strong>. I've been
                        doing this all my life and that's why{" "}
                        <strong>I know every learning technique</strong>
                        inside and out.
                    </p>

                    <p>
                        Some of my work has been featured in{" "}
                        <span role="img" aria-label="point">
                            👇
                        </span>
                    </p>
                </WrapperCopy>
                <Features>
                    <AboutMeFeatures />
                </Features>
            </Content>
        </WrapperGroup>
    </Wrapper>
);

export default () => (
    <StaticQuery
        query={graphql`
            query {
                swizec: file(relativePath: { eq: "me-circle.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 350, quality: 100) {
                            ...GatsbyImageSharpFluid
                            presentationWidth
                        }
                    }
                }
            }
        `}
        render={data => <About {...data} />}
    />
);
