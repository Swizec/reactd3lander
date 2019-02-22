import React, { Component } from 'react'
import styled from 'styled-components'

import BarChart from '../images/BarChart.png'


const Wrapper = styled.div`
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
            <h1>Stuck copy/pasting random D3 examples?</h1>
            <h3>Become a <strong>Data Visualization Engineer</strong> with React for Data Visualization.</h3>
           
            <img src={BarChart} alt='barchart'/>
        </WrapperGroup>
      </Wrapper>
    )
  }
}
