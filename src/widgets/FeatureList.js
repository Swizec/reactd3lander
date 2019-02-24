import React from 'react'
import styled from 'styled-components'



const Wrapper = styled.div`
h2 {
  text-align: center;
  }

.listwrapper {
  width: 650px;
  margin-left: auto;
  margin-right: auto;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  font-size: 24px;
  position: relative;
  padding-left: 30px;
  margin: 0 0 4rem 0;
  
  &:before {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    font-size: .75em;
  }
}
li.emoji:before { content: "🔥"; }

`



const FeatureList = props => (
  <Wrapper>
    <h2>{props.title}</h2>
    <div class="listwrapper">
    <ul>
      <li className='emoji'>{props.feature1}</li>
      <li className='emoji'>{props.feature2}</li>
      <li className='emoji'>{props.feature3}</li>
      <li className='emoji'>{props.feature4}</li>
      <li className='emoji'>{props.feature5}</li>
      <li className='emoji'>{props.feature6}</li>
    </ul>
    </div>
  </Wrapper>
)

export default FeatureList