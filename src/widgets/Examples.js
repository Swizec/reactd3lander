import React from 'react'
import styled from 'styled-components'



const Wrapper = styled.div`
margin: 7rem 0;
`

const WrapperImage = styled.div`
  
`

const Examples = props => (
  <Wrapper>
    <WrapperImage>{props.image}</WrapperImage>
    <h4>{props.header}</h4>
    <p>{props.copy}</p>
  </Wrapper>
)

export default Examples