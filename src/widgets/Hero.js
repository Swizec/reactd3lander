import React, { Component } from 'react'
import styled from 'styled-components'
import VideoBlock from '../widgets/VideoBlock'

//import Mock1 from '../images/Mock1.png'


const Wrapper = styled.div`
max-width: 700px;
margin: 0rem auto 0;
padding: 0 1rem;
height: 100%;
text-align: center;
img {
    height: 300px;
    display: block;
    margin: 0 auto;
}
@media (max-width: 940px) {
  h1 {
    font-size: 40px;
  }
}
`;


const WrapperGroup = styled.div`

`;

export default class Hero extends Component {
  render() {
    return (
      <Wrapper>
        <WrapperGroup>
            <h1>Stuck Copy/Pasting Random D3 Examples?</h1>
            <h3>Become a <strong>Data Visualization Engineer</strong> with React for Data Visualization.</h3>
            <VideoBlock 
              video={<iframe className='youtubevid' width="560" height="315" title="This is a unique title" src="https://www.youtube.com/embed/7HQzbq4s7MQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
              />
            {/*<img src={Mock1} alt='barchart'/>*/}
        </WrapperGroup>
      </Wrapper>
    )
  }
}
