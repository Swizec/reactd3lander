import React, { Component } from 'react'
import styled from 'styled-components'
import Example from '../widgets/Examples'
import examp1 from '../images/examp1.gif'
import examp2 from '../images/examp2.gif'
import examp3 from '../images/examp3.gif'
import examp4 from '../images/examp4.gif'
import examp5 from '../images/examp5.gif'
import examp6 from '../images/examp6.gif'
import examp7 from '../images/examp7.gif'
import examp8 from '../images/examp8.gif'



const Wrapper = styled.div`
max-width: 700px;
margin: 7rem auto;
padding: 0;
img {
    height: 300px;
    display: block;
    margin: 0 auto;
}
.dash {
  height: 100px;
}
@media (max-width: 940px) {
    .dash {
      height: 50px;
    }
    .tree {
      height: 200px;
    }
  }
`;

export default class Section6 extends Component {
  render() {
    return (
      <Wrapper>
        <h1>REACT+D3V4 GIVES YOU PRACTICAL EXAMPLES <span role='img' aria-label='point'>👇</span></h1>
        <Example 
          image={<img src={examp1} alt='examp'/>}
          header='An interactive choropleth map'
          copy='shows you how to work with topographical data, draw maps, and census
            regions. We implement zooming and map exploration.'
        />
        <Example 
          image={<img src={examp2} alt='examp'/>}
          header='An interactive histogram'
          copy="teaches you some of D3's statistical functions, and the basics of
            drawing charts. Drawing shapes, adding axes, parsing data ..."
        />
        <Example 
          image={<img className='dash' src={examp3} alt='examp'/>}
          header='Interactive dashboard'
          copy="Together they form an interactive dashboard where multiple charts share data, react to common controls, and act together to give users a full picture."
        />
        <Example 
          image={<img src={examp4} alt='examp'/>}
          header='A rainbow snake'
          copy="A rainbow snake teaches you about building transition-based animation. We place 50 circles on the screen and perform transitions when our user touches them with their mouse."
        />
        <Example 
          image={<img className='tree' src={examp5} alt='examp'/>}
          header='An animated alphabet'
          copy="An animated alphabet teaches you about creating enter/update/exit transitions. Animate elements coming in and out of your data visualization."
        />
        <Example 
          image={<img className='tree' src={examp6} alt='examp'/>}
          header='A particle generator'
          copy="A particle generator teaches you the basics of using Redux for state management, pushing your browser to the limits, and animating tens of thousands of elements."
        />
        <Example 
          image={<img className='tree' src={examp7} alt='examp'/>}
          header='An interactive billiards game'
          copy="An interactive billiards game teaches you about rendering graphical React components onto HTML5 canvas, making them interactive, and using MobX for state handling."
        />
        <Example 
          image={<img className='tree' src={examp8} alt='examp'/>}
          header='A dancing pythagorean tree fractal'
          copy="A dancing pythagorean tree fractal teaches you about component recursion. We use it to compare differences between React, Preact, and Inferno."
        />
       
      </Wrapper>
    )
  }
}
