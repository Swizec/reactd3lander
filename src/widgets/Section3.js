import React, { Component } from 'react'
import styled from 'styled-components'
import BarChart from '../images/BarChart.png'
import VideoBlock from '../widgets/VideoBlock'





const Wrapper = styled.div`
max-width: 700px;
margin: 7rem auto;
img {
    height: 300px;
    display: block;
    margin: 0 auto;
}
`;

export default class Section1 extends Component {
  render() {
    return (
      <Wrapper>
        <img src={BarChart} alt='bc' />
        <h2>Reusable data visualization with React and D3</h2>
        <VideoBlock 
        video={<iframe className='youtubevid' title="This is a unique title" width="560" height="315" src="https://www.youtube.com/embed/UP1nCXG2t4M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
        />
        <p>
        The talk shows a proof of concept approach to making fancy animations with React and d3js - a Space Invaders game. I explain the basic approach, where I got the idea, and show off some code.</p>
        <p>You don't have to watch the whole talk, it's all in React+D3v4.</p>
        <VideoBlock
        video={<iframe className='youtubevid' title="This is a unique title" width="560" height="315" src="https://www.youtube.com/embed/47uMw-2mb4U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
        />
        <p>This talk is more hands on. I show how the animated alphabet, particle generator, and talk about the benefits of componentization when it comes to building modern data visualization.</p>
        <VideoBlock
        video={<iframe className='youtubevid' title="This is a unique title" width="560" height="315" src="https://www.youtube.com/embed/9JvIyz7uB2s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
        />
      </Wrapper>
    )
  }
}
