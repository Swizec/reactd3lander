import React, { Component } from 'react'
import styled from 'styled-components'
import BarChart from '../images/BarChart.png'
import VideoBlock from '../widgets/VideoBlock'





const Wrapper = styled.div`
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
        video={<iframe frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media" title="YouTube video player" width="853" height="480" className='youtubevid' src="https://www.youtube.com/embed/UP1nCXG2t4M?enablejsapi=1&amp;origin=https%3A%2F%2Fswizec.com&amp;widgetid=1" id="widget2"></iframe>}
        />
        <p>
        The talk shows a proof of concept approach to making fancy animations with React and d3js - a Space Invaders game. I explain the basic approach, where I got the idea, and show off some code.</p>
        <p>You don't have to watch the whole talk, it's all in React+D3v4.</p>
        <VideoBlock
        video={<iframe frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media" title="YouTube video player" width="853" height="480" className='youtubevid' src="https://www.youtube.com/embed/47uMw-2mb4U?enablejsapi=1&amp;origin=https%3A%2F%2Fswizec.com&amp;widgetid=3" id="widget4"></iframe>}
        />
        <p>This talk is more hands on. I show how the animated alphabet, particle generator, and talk about the benefits of componentization when it comes to building modern data visualization.</p>
        <VideoBlock
        video={<iframe frameborder="0" allowfullscreen="1" allow="autoplay; encrypted-media" title="YouTube video player" width="853" height="480" className='youtubevid' src="https://www.youtube.com/embed/47uMw-2mb4U?enablejsapi=1&amp;origin=https%3A%2F%2Fswizec.com&amp;widgetid=3" id="widget4"></iframe>}
        />
      </Wrapper>
    )
  }
}
