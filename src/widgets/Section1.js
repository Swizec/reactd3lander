import React, { Component } from 'react'
import styled from 'styled-components'



const Wrapper = styled.div`
max-width: 700px;
margin: 0 auto;
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
        <p><span class="firstcharacter">C</span>reating dynamic and interactive data visualizations on the web is a pain in the ass. It gets really hard when you add animation, inter-connected dashboards, and fast performance on mobile devices.</p>
        <p>You're either using libraries you can't customize, copy pasting D3 examples you don't understand, or battling documentation to write spaghetti code you can't reuse.</p>
        <p>It's okay, we've all been there.</p>
        <p>But it doesn't have to be that way.</p>
        <p>With React+D3v4 you'll learn the basics of building fast data visualization components in about an hour. Get started immediately without installing anything.
        </p>
        <p>Don't know React? React+D3v4 starts at the very beginning.</p>
        <p>Struggling with D3? Every function is explained.</p>
        <p>New to modern JavaScript syntax? React+D3v4 comes with an interactive ES6 cheatsheet.</p>
        <p>Get the confidence you need to excel.<span role='img' aria-label='fist'>💪</span></p>
      </Wrapper>
    )
  }
}
