import React, { Component } from 'react'
import styled from 'styled-components'

import swizec from '../images/swizec.png'

const Wrapper = styled.div`
max-width: 700px;
margin: 0 auto;
`
const WrapperGroup = styled.div`
 h1 {
     text-align: center;
 }
`

const WrapperImage = styled.img`
margin: 0 auto;
display: block;
  height: 300px;
  grid-area: Picture;
  @media (max-width: 940px) {
    height: 200px;
  }
`

const WrapperCopy = styled.div`
  grid-area: Copy;
`


const Content = styled.div`
  margin: 0 2rem;
  {/*display: grid;
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
  }*/}
`

export class About extends Component {
  render() {
    return (
        <Wrapper>
        <WrapperGroup>
          <h1>ABOUT THE AUTHOR</h1>
          <Content>
            <WrapperImage src={swizec} alt="pic" />
            <WrapperCopy>
            <p>Hi, I’m Swizec Teller. I help coders become software engineers.</p>
    
            <p>Over the years I've helped over 10,000 engineers hone their craft. People
            from Uber, Oracle, Apple and many others have used my books, articles, and
            talks to improve their technical skills, get promotions, change jobs, and ship
            their products faster.</p>
    
            <p>Story time 👇</p>
    
            <p>React+D3 started as a bet in April 2015. A friend wanted to learn React and
            challenged me to publish a book. A month later React+D3 launched with 79 pages
            of hard earned knowledge.</p>
    
            <p>In April 2016 it became React+D3 ES6. 117 pages and growing beyond a single
            big project it was a huge success. I kept going, started live streaming, and
            publishing videos on YouTube.</p>
    
            <p>It's 2017 now and after 10 months of work, React+D3v4 is the best book
            I've ever written. 249 pages, many examples, much code to play with. It's
            designed like a step-by-step course so you can follow along without breaking a
            sweat.</p>
    
            <p>I based React+D3v4 on 20 years of experience with learning how to code on
            my own, reading blogs and articles, listening to professors, and working
            with mentors. Yes, that means I wrote my first program when I was 9. I've
            been doing this all my life and that's why I know every learning technique
            inside and out.</p>
    
            <p>Some of my work has been featured in 👇</p>
            </WrapperCopy>
          </Content>
        </WrapperGroup>
      </Wrapper>
    )
  }
}

export default About

