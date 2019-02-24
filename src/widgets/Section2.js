import React, { Component } from 'react'
import styled from 'styled-components'
import BarChart from '../images/BarChart.png'
import Prism from "prismjs";
import "./prism.css";





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

export default class Section1 extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render() {
    return (
      <Wrapper>
        <img src={BarChart} alt='bc' />
        <h2>React is the biggest revolution in JavaScript programming since jQuery hit the scene 10 years ago, and D3 is unlike anything you've seen before.</h2>

        <p>"How the hell is it doing that?" is the most common phrase I hear when teaching people about React and D3. "What do I put in a component? Should it be a state or a prop? These D3 examples don't make any sense"</p>
        <p>The problem comes from how most of us first learn to code. "It's like a cooking recipe", teachers will say.</p>
        <p>Take a bell pepper and cut it up. Then sprinkle some salt and pepper, add olive oil, and voila: you have a refreshing salad. A very simple salad with a single ingredient, but it's a salad. You can follow along and eventually you will understand what the code does.</p>
        <p>That's called imperative programming. It reads as a series of steps. How to do something.</p>
        <p>But React and D3 are declarative. You don't write How you want your code to work, you write What you want to achieve. Your bell pepper salad recipe looks more like this:</p>
        <pre>
            <code className="language-javascript">
  {`
  <Salad>
    <Oil />
    <BellPepper cut salted />
  </Salad>
  `}       
            </code>
        </pre>
        <p>You look at that and you immediately know it's a salad. It involves oil and bell peppers. You don't have to read all the steps to know the result. The recipe declares what it's making.</p>
        <p>Declarative code makes your project cleaner and easier to maintain, which means you spend more time delivering value to your users and clients.</p>
        <p>But learning how to think declaratively is hard. It feels like voodoo magic until you get used to it. We've all been there. To this day it still hurts my brain sometimes.</p>
        <p>That's why React+D3v4 takes you on a journey through 7 projects and 5 interactive examples. Learn the basics in about an hour then dive as deep as you want to solidify your knowledge. Get the confidence you need to excel at your job.
        </p>
      </Wrapper>
    )
  }
}
