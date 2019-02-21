import React, { Component } from 'react'
import styled from 'styled-components'
import swizec from '../images/Swizec.png'
import oval from '../images/Oval.png'
import BarChart from '../images/BarChart.png'


const Wrapper = styled.div`
background-image: url(${oval});
background-size: 50rem;
background-repeat: no-repeat;
background-position: center;
height: 100%;
margin: 0;
padding: 0;
img {
    height: 300px;
}
@media (max-width: 940px) {
    img {
        height: 200px;
    }
}
`;


const WrapperGroup = styled.div`
max-width: 1100px;
margin: 2rem auto 0;
padding: 0 2rem;
display: grid;
align-items: center;
justify-items: center;
grid-template-columns: 1fr 1fr;
grid-template-areas:
'left right'
'center center';
.C1 {
    grid-area: left;
}
.C2 {
    grid-area: right;
}
.C3 {
    grid-area: center;
}
h1 {
    font-size: 64px;
}
h3 {
    font-size: 44px;
}
@media (max-width: 940px) {
h1 {
font-size: 44px;
}
h3 {
    font-size: 34px;
}
grid-template-columns: 1fr;
grid-template-areas:
' right'
'left '
'center ';
}

`;

export default class Hero extends Component {
  render() {
    return (
      <Wrapper>
        <WrapperGroup>
            <div className='C1'>
            <h1>Stuck copy pasting random D3 examples?</h1>
            <h3>Become a <strong>data visualization engineer</strong> with React for Data Visualization.</h3>
            </div>
            <div className='C2'>
            <img src={swizec} alt='swizec'/>
            </div>
            <img className='C3' src={BarChart} alt='barchart'/>
        </WrapperGroup>
      </Wrapper>
    )
  }
}
