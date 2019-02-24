import React from 'react'
import styled from 'styled-components'
import Sample from '../images/sample.png'

const Wrapper = styled.div`
max-width: 900px;
margin: 7rem auto;
padding: 0;
text-align: center;
img {
  height: 300px;
}  
@media (max-width: 940px) {
  img {
    height: 140px;
  }
}
`
const WrapperHeader = styled.div``

const WrapperForm = styled.div`
  input {
    max-width: 400px;
    margin: 0 auto;
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px;
    font-size: 14px;
    line-height: 1.428571429;
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    
  }
`
const WrapperSubmit = styled.div`
  input {
    background-color: #ff871c;
    line-height: 1.8;
    -webkit-box-shadow: 0 3px 0 rgb(214, 106, 18);
    box-shadow: 0 3px 0 rgb(214, 106, 18);
    text-transform: uppercase;
    padding: 0.5rem;
    margin: 1rem 0;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    color: #fff;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    border-radius: 4px;
  }
`
const EmailSignup = props => (
  <Wrapper>
    <h1>START WITH A FREE CHAPTER AND EMAIL CRASH COURSE</h1>
    <h3>See what React+D3v4 is like and learn the basics.</h3>
    <img src={Sample} alt="readymade-logo" />
    <WrapperHeader>{props.header}</WrapperHeader>
    <WrapperForm>{props.input}</WrapperForm>
    <WrapperSubmit>{props.submit}</WrapperSubmit>
  </Wrapper>
)

export default EmailSignup