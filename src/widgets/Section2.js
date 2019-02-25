import React, { Component } from 'react'
import styled from 'styled-components'
import pshot2 from '../images/pshot2.gif'
import Prism from "prismjs";
import "./prism.css";





const Wrapper = styled.div`
max-width: 700px;
margin: 7rem auto;
padding: 0 2rem;
h2 {
  font-weight: 400;
}
img {
    height: 300px;
    display: block;
    margin: 0 auto;
}
@media (max-width: 940px) {
  img {
    height: 200px;
  }
}

`;

export default class Section1 extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }
  render() {
    return (
      <Wrapper>
        <img src={pshot2} alt='bc' />
        <h2><strong>React is the biggest revolution</strong> in JavaScript programming since jQuery hit the scene 10 years ago, and <strong>D3 is unlike anything</strong> you've seen before.</h2>

        <p><i>"How the hell is it doing that?"</i> is the most common phrase I hear when teaching people about React and D3. <i>"What do I put in a component? Should it be a state or a prop?</i> These D3 examples don't make any sense"</p>
        <p>The problem comes from how most of us first learn to code. "It's like a cooking recipe", teachers will say.</p>
        <p>Take a bell pepper and cut it up. Then sprinkle some salt and pepper, add olive oil, and voila: you have a refreshing salad. A very simple salad with a single ingredient, but it's a salad. You can follow along and eventually you will understand what the code does.</p>
        <p>That's called imperative programming. It reads as a series of steps. How to do something.</p>
        <p>But React and D3 are declarative. <strong>You don't write How you want your code to work, you write What you want to achieve.</strong> Your bell pepper salad recipe looks more like this:</p>
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
        <p>You look at that and you immediately know it's a salad. It involves oil and bell peppers. You don't have to read all the steps to know the result. <strong>The recipe declares what it's making.</strong></p>
        <p>Declarative code makes your project <strong>cleaner</strong> and <strong>easier to maintain</strong>, which means you <strong>spend more time delivering value to your users and clients.</strong></p>
        <p>But <strong>learning how to think declaratively</strong> is hard. It feels like voodoo <strong>magic until you get used to it.</strong> We've all been there. To this day it still hurts my brain sometimes.</p>
        <p>That's why <strong>React+D3v4</strong> takes you on a journey through <strong>7 projects and 5 interactive examples. Learn the basics in about an hour</strong> then dive as deep as you want to solidify your knowledge. Get <strong>the confidence you need to excel</strong> at your job.
        </p>
      </Wrapper>
    )
  }
}
