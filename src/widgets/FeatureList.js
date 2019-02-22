import React from 'react'
import styled from 'styled-components'



const Wrapper = styled.div``



const FeatureList = props => (
  <Wrapper>
    <h2>{props.title}</h2>
    <ul>
      <li>{props.feature1}</li>
      <li>{props.feature2}</li>
      <li>{props.feature3}</li>
      <li>{props.feature4}</li>
      <li>{props.feature5}</li>
      <li>{props.feature6}</li>
      <li>{props.feature7}</li>
      <li>{props.feature8}</li>
      <li>{props.feature9}</li>
      <li>{props.feature10}</li>
    </ul>
  </Wrapper>
)

export default FeatureList