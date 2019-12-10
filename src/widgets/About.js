import React  from 'react'
import styled from 'styled-components'
import AboutMeFeatures from '../widgets/AboutMeFeatures'
import { StaticQuery, graphql } from 'gatsby'

import Image from '../widgets/Image'
import { Title } from '../styles'

const Wrapper = styled.div`
  max-width: 700px;
  margin: 7rem auto;
  padding: 0 2rem;
`
const WrapperGroup = styled.div`
  h1 {
    text-align: center;
  }
`

// const WrapperImage = styled.div`
//   img {
//     margin: 0 auto;
//     display: block;
//     height: 300px;
//     grid-area: Picture;
//   }
//   @media (max-width: 940px) {
//     img {
//       height: 200px;
//     }
//   }
// `

const WrapperCopy = styled.div`
  grid-area: Copy;
`
const Features = styled.div`
  text-align: center;
  grid-area: Feat;
`

const Content = styled.div`
  margin: 0 0rem;
`

/*{
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

const About = ({ swizec }) => (
  <Wrapper>
    <Title>About the Author</Title>
    <WrapperGroup>
      <Content>
        <a href="https://swizec.com">
          <Image {...swizec.childImageSharp} />
        </a>
        <WrapperCopy>
          <p>
            Hi, I’m <strong>Swizec Teller</strong>. I help{' '}
            <strong>coders become software engineers.</strong>
          </p>

          <p>
            Story time{' '}
            <span role="img" aria-label="point">
              <span role="img" aria-label="finger-down">👇</span>
            </span>
          </p>

          <p>
            React+D3 started as a bet in April 2015. A friend wanted to learn
            React and challenged me to publish a book. A month later React+D3
            launched with 79 pages of hard earned knowledge.
          </p>

          <p>
            In April 2016 it became <strong>React+D3</strong> ES6. 117 pages
            and growing beyond a single big project it was a huge success. I
            kept going, started live streaming, and publishing videos on
            YouTube.
          </p>

          <p>
            In 2017, after 10 months of work, <strong>React + D3v4</strong>{' '}
            became the best book I'd ever written. At 249 pages, many examples,
            and code to play with it was designed like a step-by-step course.
            But I felt something was missing.
          </p>

          <p>
            So in late 2018 I rebuilt the entire thing as{' '}
            <a href="https://reactfordataviz.com">
              React for Data Visualization
            </a>{' '}
            &mdash; a proper video course. Designed for busy people with real
            lives like you. Over 8 hours of video material, split into chunks
            no longer than 5 minutes, a bunch of new chapters, and techniques I
            discovered along the way.
          </p>

          <p>
            <strong>React for Data Visualization</strong> is the best way to
            learn how to build scalable dataviz components your whole team can
            understand.
          </p>
          <p>
            Some of my work has been featured in{' '}
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
)

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
)
