import React, { Component } from 'react'
import styled from 'styled-components'
import Video from '../widgets/VideoBlock'
import { HeroTitle } from '../styles'

const Wrapper = styled.div`
  max-width: 750px;
  margin: 0rem auto 0;
  padding: 0 1rem;
  height: 100%;
  text-align: center;
  img {
    height: 300px;
    display: block;
    margin: 0 auto;
  }
`

const WrapperGroup = styled.div``

export default class Hero extends Component {
  render() {
    return (
      <React.Fragment>
        <HeroTitle>
          Stop copy pasting D3 examples,
          <br />
          create data visualizations of your own
        </HeroTitle>

        <Wrapper>
          <WrapperGroup>
            <p>
              Learn how to <strong>build scalable dataviz components</strong>{' '}
              your whole team can understand with React for Data Visualization.{' '}
            </p>
            <Video videoId="CoTTJ-vR1Mc" />
          </WrapperGroup>
        </Wrapper>
      </React.Fragment>
    )
  }
}
