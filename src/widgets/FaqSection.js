import React, { Component } from 'react'
import FAQ from '../widgets/Faq'
import styled from 'styled-components'


const Wrapper = styled.div`
max-width: 700px;
margin: 7rem auto;
h2 {
  margin: 0;
}
`


export class FaqSection extends Component {
  render() {
    return (
      <Wrapper>
      <h2>FAQ</h2>
        <FAQ 
        question='IS REACT+D3V4 FOR ME?'
        answer="Yes. 
        If you already know JavaScript and perhaps some React and D3, this book is perfect. It's designed with React and D3 beginners in mind. If you're a veteran, you might want to skip some sections. But if you're new to web programming, I suggest finding something easier."
        />
        <FAQ 
        question='WHICH PACKAGE SHOULD I CHOOSE?'
        answer="That depends on your preferred style of learning.
        The book is great if you like to learn the basics in your browser, then switch to a real editor and local environment to go deep.
        The interactive course is great if you'd prefer to stay in your browser throughout.
        Coaching is perfect if you have specific questions or prefer explanations tailored to you personally.
        The videos are great, if you like to see how everything fits together visually."
        />
        <FAQ 
        question="I DON'T LIKE REACT. IS REACT+D3V4 STILL USEFUL?"
        answer="Yes! You can apply the core ideas behind React+D3v4 to any modern framework. Angular, Vue, or anything else that aims to separate business and rendering logic with a declarative approach."
        />
        <FAQ 
        question='WHAT IF I HATE REACT+D3V4?'
        answer="Send me an email and I'll click the magic refund button. You even get to keep the book."
        />
        
      </Wrapper>
    )
  }
}

export default FaqSection
