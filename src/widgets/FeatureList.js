import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import Image from '../widgets/Image'

const Wrapper = styled.div`
  h2 {
    text-align: center;
  }
  p {
    font-size: 18px;
    max-width: 400px;
    margin: 0 auto;
  }

  .boxes {
    img {
      height: 150px;
      margin: 0 auto;
      display: block;
      text-align: center;
    }
    display: grid;
    grid-gap: 4rem;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'b1 b2 b3'
      'b4 b5 b6';

    @media (max-width: 940px) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'b1'
        'b2'
        'b3'
        'b4'
        'b5'
        'b6';
    }
  }
  .box1 {
    grid-area: b1;
  }
  .box2 {
    grid-area: b2;
  }
  .box3 {
    grid-area: b3;
  }
  .box4 {
    grid-area: b4;
  }
  .box5 {
    grid-area: b5;
  }
  .box6 {
    grid-area: b6;
  }
`

const FeatureList = ({ block1, block2, block3, block4, block5, block6 }) => (
  <Wrapper>
    <h2>Start with the building blocks</h2>
    <div className="boxes">
      <div className="box1">
        <Image {...block1.childImageSharp} />
        <p>
          <strong>1.) </strong>Start with the basics. Right in your browser.
        </p>
      </div>
      <div className="box2">
        <Image {...block2.childImageSharp} />
        <p>
          <strong>2.) </strong>Learn about blackbox rendering with a reusable
          axis component. Teaches you all about giving up control, using higher
          order componnents, and more. You can use this approach to render
          *anything* inside your React app. Even Vue.
        </p>
      </div>
      <div className="box3">
        <Image {...block3.childImageSharp} />
        <p>
          <strong>3.) </strong>Learn full integration rendering with a
          scatterplot. Use the axis from before, add a bunch of data, then go
          as far as usinng render props to make your scatterplot shine.
        </p>
      </div>
      <div className="box4">
        <Image {...block4.childImageSharp} />
        <p>
          <strong>4.) </strong>Both times youre learning how to make your
          components reusable. Plug-and-play buildign blocks for your team.
        </p>
      </div>
      <div className="box5">
        <Image {...block5.childImageSharp} />
        <p>
          <strong>5.) </strong>Jump into animation with game loops where you
          learn about havign full control, how to think in frames andn
          movement. Youll be suprrised how powerful this can be.
        </p>
      </div>
      <div className="box6">
        <Image {...block6.childImageSharp} />
        <p>
          <strong>6.) </strong>When full animation is too much, youll need
          transitions. Learn about keyframes and easing functions and makign
          your animation look antural and smooth.
        </p>
      </div>
    </div>
  </Wrapper>
)

export default () => (
  <StaticQuery
    query={graphql`
      query {
        block1: file(relativePath: { eq: "block1.png" }) {
          childImageSharp {
            fixed(width: 224, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        block2: file(relativePath: { eq: "block2.png" }) {
          childImageSharp {
            fixed(width: 224, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        block3: file(relativePath: { eq: "block3.png" }) {
          childImageSharp {
            fixed(width: 224, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        block4: file(relativePath: { eq: "block4.png" }) {
          childImageSharp {
            fixed(width: 224, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        block5: file(relativePath: { eq: "block5.png" }) {
          childImageSharp {
            fixed(width: 224, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        block6: file(relativePath: { eq: "block6.png" }) {
          childImageSharp {
            fixed(width: 224, height: 150) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <FeatureList {...data} />}
  />
)
