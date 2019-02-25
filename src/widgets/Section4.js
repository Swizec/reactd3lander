import React, { Component } from 'react'
import styled from 'styled-components'
import pshot2 from '../images/pshot2.gif'




const Wrapper = styled.div`
max-width: 700px;
margin: 7rem auto;
padding: 0 2rem;
img {
    height: 300px;
    display: block;
    margin: 0 auto;
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
        <img src={pshot2} alt='bc' />
        <h2>React for Data Visualization shows you the way</h2>
        <p>React+D3v4 gives you a quick overview of the basics to get you started, followed by a deep dive that solidifies your knowledge through varied projects and examples. Build working code that you can show off to your friends, boss, and coworkers.</p>
        <p>Learn the basics with interactive examples right in your browser — no need to install anything. Forget about Npm and Webpack and Babel and Node. Just React and D3.</p>
        <p>Dive into 7 projects that teach you how it all fits together. Build interactive visualizations, create animations, and build fast performance with canvas. Learn everything there is to know about building beautiful apps with React and D3.</p>
        <p>From the very basics of React and D3, to state handling with Redux and MobX, React alternatives like Preact and Inferno.</p>
        
      </Wrapper>
    )
  }
}
