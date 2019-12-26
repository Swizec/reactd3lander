import React from 'react'
import styled from 'styled-components'
import { Title } from '../styles'

import Example from '../widgets/Examples'
import examp1 from '../images/examp1.gif'
import examp2 from '../images/examp2.gif'
import examp3 from '../images/examp3.gif'
import examp4 from '../images/examp4.gif'
import examp5 from '../images/examp5.gif'
import examp6 from '../images/examp6.gif'
import examp7 from '../images/examp7.gif'
import examp8 from '../images/examp8.gif'
import examp0 from '../images/pietobar.gif'

const Wrapper = styled.div`
  max-width: 700px;
  margin: 7rem auto;
  padding: 0 2rem;
  h1 {
    margin: 0;
    text-align: center;
  }
  .dash {
    height: 100px;
  }
  @media (max-width: 940px) {
    h1 {
      font-size: 30px;
    }
    .dash {
      height: 50px;
    }
    .tree {
      height: 200px;
    }
  }
`

const Section6 = () => (
  <>
    <Title>React for Data Visualization builds on practical examples</Title>
    <Wrapper>
      <Example
        image={examp0}
        header="A piechart transitions to a barchart"
        copy="Shows you how to use hybrid animation for data-driven effects. Even transitioning between different visualization types."
      />
      <Example
        image={examp1}
        header="An interactive choropleth map"
        copy="Shows you how to work with topographical data, draw maps, and census regions. We implement zooming and map exploration."
      />
      <Example
        image={examp2}
        header="An interactive histogram"
        copy="Teaches you some of D3's statistical functions, and the basics of drawing charts. Drawing shapes, adding axes, parsing data ..."
      />
      <Example
        image={examp3}
        header="Interactive dashboard"
        copy="Together they form an interactive dashboard where multiple charts share data, react to common controls, and act together to give users a full picture."
      />
      <Example
        image={examp4}
        header="A swipe transition"
        copy="A swipe transition teaches you about building transition-based animation. Flip a boolean, see complex animation."
      />
      <Example
        image={examp5}
        header="An animated alphabet"
        copy="An animated alphabet teaches you about creating enter/update/exit transitions. Animate elements coming in and out of your data visualization."
      />
      <Example
        image={examp6}
        header="A particle generator"
        copy="A particle generator teaches you the basics of using Redux for state management, pushing your browser to the limits, and animating tens of thousands of elements."
      />
      <Example
        image={examp7}
        header="An interactive billiards game"
        copy="An interactive billiards game teaches you about rendering graphical React components onto HTML5 canvas, making them interactive, and using MobX for state handling."
      />
      <Example
        image={examp8}
        header="A dancing pythagorean tree fractal"
        copy="A dancing pythagorean tree fractal teaches you about component recursion. We use it to compare differences between React, Preact, and Inferno."
      />
    </Wrapper>
  </>
)

export default Section6
