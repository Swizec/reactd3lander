import React, { Component } from 'react'
import styled from 'styled-components'

import Mock1 from '../images/Mock1.png'


const Wrapper = styled.div`
max-width: 700px;
margin: 0rem auto 0;
height: 100%;
text-align: center;
img {
    height: 300px;
    display: block;
    margin: 0 auto;
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
           
            <img src={Mock1} alt='barchart'/>
        </WrapperGroup>
      </Wrapper>
    )
  }
}
