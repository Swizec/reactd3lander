import React, { Component } from 'react'
import styled from 'styled-components'
import pshot3 from '../images/pshot3.png'




const Wrapper = styled.div`
max-width: 750px;
margin: 7rem auto;
padding: 0 2rem;
img {
    height: 400px;
    display: block;
    margin: 0 auto;
    text-align: center;
}
h2 {
  text-align: center;
}
@media (max-width: 940px) {
  img {
    height: 200px;
  }
}

`;

export default class Section1 extends Component {
  render() {
    return (
      <Wrapper>
        <img src={pshot3} alt='bc' />
        <h2>React for Data Visualization shows you the way</h2>
        <p>React+D3v4 gives you a <strong>quick overview of the basics</strong> to get you started, followed by a <strong>deep dive</strong> that <strong>solidifies your knowledge</strong> through varied projects and examples. <strong>Build working code</strong> that you can <strong>show off to your friends, boss, and coworkers.</strong></p>
        <p>Learn the basics with <strong>interactive examples right in your browser</strong> — no need to install anything. Forget about Npm and Webpack and Babel and Node. <strong>Just React and D3.</strong></p>
        <p><strong>Dive into 7 projects</strong> that teach you how it all fits together. Build <strong>interactive visualizations</strong>, create <strong>animations</strong>, and build <strong>fast performance with canvas</strong>. Learn everything there is to know about building <strong>beautiful apps with React and D3.</strong></p>
        <p>From the very <strong>basics of React and D3</strong>, to state handling with <strong>Redux</strong> and <strong>MobX</strong>, React alternatives like <strong>Preact</strong> and <strong>Inferno.</strong></p>
        
      </Wrapper>
    )
  }
}
