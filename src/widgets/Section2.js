import React, { Component } from 'react'
import styled from 'styled-components'
import pshot2 from '../images/pshot2.gif'
import Prism from 'prismjs'
import './prism.css'

import { LazyImage } from '../widgets/Image'
import ActionButton from './ActionButton'

const Wrapper = styled.div`
  max-width: 700px;
  margin: 7rem auto;
  padding: 0 2rem;

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
`

export default class Section1 extends Component {
  componentDidMount() {
    Prism.highlightAll()
  }

  render() {
    return (
      <Wrapper>
        <h2>
          "without it I'm stuck using stack overflow in a disjointed, incorrect
          mess"
        </h2>

        <LazyImage height={300} src={pshot2} />

        <p>
          You can avoid all that and learn how to build scalable and reusable
          dataviz components your whole team <em>and</em> future you can
          understand with <strong>React for Data Visualization</strong>.
        </p>

        <p>
          Get the confidence you need to excel and build anything you can
          imagine. <span role="img" aria-label="strong arm"> 💪</span>
        </p>

        <p>
          React is the biggest revolution in JavaScript programming since
          jQuery hit the scene 10 years ago, and D3 is unlike anything you've
          seen before.
        </p>

        <p>
          The problem comes from how most of us first learn to code. &quot;It's
          like a cooking recipe&quot;, teachers will say.
        </p>

        <p>
          Take a bell pepper and cut it up. Then sprinkle some salt and pepper,
          add olive oil, and voila: you have a refreshing salad. A very simple
          salad with a single ingredient, but a salad nonetheless. You can
          follow along and eventually you will understand what the code does.
        </p>

        <p>
          That's imperative programming. It reads as a series of steps. How to
          do something.
        </p>

        <p>
          React and D3 are declarative. You don't write <em>How</em> you want
          your code to work, you write <em>What</em> you want to achieve. Your
          bell pepper salad recipe looks more like this:{' '}
        </p>
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
        <p>
          You look at that and you know it's a salad. It involves oil and bell
          peppers. You don't have to read the steps to know the result. The
          recipe declares what it's making.
        </p>

        <p>
          Declarative code makes your project cleaner and easier to maintain.
          Means more time creating value for your users and clients.
        </p>

        <p>
          But learning how to think declaratively is hard. It starts like
          voodoo magic. We've all been there. It still hurts my brain
          sometimes.
        </p>

        <p>
          That's why <strong>React for Data Visualization</strong> starts with
          small building blocks then builds up to entire dashboards. Learn the
          basics in about an hour, then dive as deep as you want
        </p>

        <ActionButton to="#pricing" style={{ marginTop: '15px' }}>
          <span role="img" aria-label="finger-down">👇</span>Jump into ReactForDataviz<span role="img" aria-label="finger-down">👇</span>
        </ActionButton>
      </Wrapper>
    )
  }
}
