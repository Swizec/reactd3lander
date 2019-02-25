import React, { Component } from 'react'
import styled from 'styled-components'



const Wrapper = styled.div`
max-width: 700px;
margin: 0rem auto;
padding: 0 2rem;
.firstcharacter {
  color: #f77b12;
  float: left;
  font-weight: 900;
  font-size: 120px;
  line-height: 60px;
  padding-top: 4px;
  padding-right: 8px;
  padding-left: 3px;
}
`;

export default class Section1 extends Component {
  render() {
    return (
      <Wrapper>
        <p><span class="firstcharacter">C</span>reating <strong>dynamic</strong> and <strong>interactive data</strong> visualizations on the web is a pain in the ass. It gets really hard when you add <strong>animation</strong>, inter-connected <strong>dashboards</strong>, and fast <strong>performance</strong> on mobile devices.</p>
        <p>You're either using <strong>libraries you can't customize</strong>, copy pasting D3 examples you don't understand, or <strong>battling documentation</strong> to write spaghetti <strong>code you can't reuse.</strong></p>
        <p>It's okay, we've all been there.</p>
        <p>But it doesn't have to be that way.</p>
        <p>With <strong>React+D3v4</strong> you'll learn the basics of building <strong>fast data visualization components</strong> in about an hour. Get started <strong>immediately without installing anything.</strong>
        </p>
        <p>Don't know React? <strong>React+D3v4 starts at the very beginning.</strong></p>
        <p>Struggling with D3? <strong>Every function is explained.</strong></p>
        <p>New to modern JavaScript syntax? React+D3v4 comes with an <strong>interactive ES6 cheatsheet.</strong></p>
        <p>Get the confidence you need to excel.<span role='img' aria-label='fist'>💪</span></p>
      </Wrapper>
    )
  }
}
