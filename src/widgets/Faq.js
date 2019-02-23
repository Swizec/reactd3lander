import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 700px;
margin: 0 auto;
`
const WrapperQuestion = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 10px 0;
  color: #384047;
  padding: 2rem 0 0;
`

const WrapperAnswer = styled.div`
  font-weight: 100;
  font-size: 18px;
  color: #4e616c;
`

const FAQ = props => (
  <Wrapper>
    <WrapperQuestion>{props.question}</WrapperQuestion>
    <WrapperAnswer>{props.answer}</WrapperAnswer>
  </Wrapper>
)

export default FAQ
