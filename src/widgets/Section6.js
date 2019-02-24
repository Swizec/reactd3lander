import React, { Component } from 'react'
import styled from 'styled-components'
import BarChart from '../images/BarChart.png'
import FeatureList from '../widgets/FeatureList'




const Wrapper = styled.div`
max-width: 700px;
margin: 7rem auto;
padding: 0;
img {
    height: 300px;
    display: block;
    margin: 0 auto;
}

`;

export default class Section6 extends Component {
  render() {
    return (
      <Wrapper>
        <img src={BarChart} alt='bc' />
        <FeatureList 
            title='Build practical examples'
            feature1='An interactive choropleth map shows you how to work with topographical data, draw maps, and census regions. We implement zooming and map exploration.'
            feature2='An interactive histogram teaches you some of D3s statistical functions, and the basics of drawing charts. Drawing shapes, adding axes, parsing data ...'
            feature3='A rainbow snake teaches you about building transition-based animation. We place 50 circles on the screen and perform transitions when our user touches them with their mouse.'
            feature4='An animated alphabet teaches you about creating enter/update/exit transitions. Animate elements coming in and out of your data visualization.'
            feature5='A particle generator teaches you the basics of using Redux for state management, pushing your browser to the limits, and animating tens of thousands of elements.'
            feature6='An interactive billiards game teaches you about rendering graphical React components onto HTML5 canvas, making them interactive, and using MobX for state handling.'
            feature7='A dancing pythagorean tree fractal teaches you about component recursion. We use it to compare differences between React, Preact, and Inferno.'
            feature8='Hooks are the new revolution in React. A complete new way to write your code. Learn how React Hooks work with a refactoring exercise.'
            feature9='A bunch more examples you can use as a cookbook. Piecharts, barcharts, linecharts and more. Watch me build them from scratch, use the code in your projects when it fits.'
            feature10='Visualizing every airplane in the world, live, teaches you the basics of optimizingn your dataviz code with WebGL.'
        />
  
      </Wrapper>
    )
  }
}
