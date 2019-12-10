import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 700px;
  margin: 7rem auto;
  padding: 0 2rem;

  hr {
    border: 5px dashed #f77b12;
    width: 40px;
  }
  .border {
    max-width: 50px;
    margin: 0 auto;
  }
  h3 {
    font-size: 1em;
    margin-top: 1rem;
  }
  p {
    margin-bottom: 0px;
    padding-left: 2em;
    font-size: 0.8em;
  }
  .header {
    text-align: center;
  }
  .chapter {
    padding: 2rem;
    margin: 1rem 0rem;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.25);
  }
`

export class TableOfContents extends Component {
  render() {
    return (
      <Wrapper>
        <h2 className="header">Table of Contents</h2>
        <h3>Introduction</h3>
        <p>Hello new friend <span role="img" aria-label="wave"> 👋</span> (6:08)</p>
        <p>What you need to know (2:16)</p>
        <p>How to approach React for Dataviz(3: 16)</p>
        <p>Why React and D3(0: 22)</p>
        <p>Buzzword soup explained</p>
        <p>JSX</p>
        <p>What you'll build (2:30)</p>
        <h3>A quick intro to D3</h3>
        <p>Why D3 (1:03)</p>
        <p>3 key insights to learn D3 from scratch(2: 23)</p>
        <p>Data vs.DOM manipulation(6: 07)</p>
        <p>Scales(4: 12)</p>
        <p>D3 layouts(1: 41)</p>
        <p>Recap(1: 49)</p>
        <h3>How React makes D3 easier</h3>
        <p>React + D3 = <span role="img" aria-label="heart">❤️</span> (4:53)</p>
        <p>What about existing libraries? (2:13)</p>
        <p>Victory.js(1: 04)</p>
        <p>Recharts(0: 54)</p>
        <p>Nivo(1: 11)</p>
        <p>VX(1: 07)</p>
        <p>When you shouldn't use a library (1:14)</p>
        <h3>
          Quickly integrate any D3 code in your React project with Blackbox
          Components
        </h3>
        <p>The idea behind blackbox components (0:57)</p>
        <p>A quick blackbox example - a D3 axis (3:36)</p>
        <p>A React + D3 axis(5: 19)</p>
        <p>A D3 blackbox higher order component - HOC(2: 26)</p>
        <p>D3blackbox magic trick - render anything in 30 seconds(5: 11)</p>
        <h3>Build scalable dataviz components with full integration</h3>
        <p>The approach (1:52)</p>
        <p>When props don't change - a scatterplot (9:26)</p>
        <p>A scatterplot When props do change(6: 36)</p>
        <p>Making your components more flexible with render props(6: 08)</p>
        <h3>You're awesome</h3>
        <p><span role="img" aria-label="strong arm">💪</span> (0:39)</p>
        <h3>A note about state and app structure</h3>
        <p>Handling state in your React app (0:48)</p>
        <p>Basic architecture we'll use (2:11)</p>
        <p>What about React Context? Redux? MobX?</p>
        <p>How to structure your app</p>
        <p>Congratz!</p>
        <h3>Set up a local environment with create-react-app</h3>
        <p>Local environment setup</p>
        <p>Start with create-react-app (1:10)</p>
        <p>What you get</p>
        <p>Install extra dependencies(0: 43)</p>
        <h3>176,113 tech salaries visualized – a dataviz dashboard</h3>
        <p>176,113 tech salaries visualized (2:54)</p>
        <h3>Show a Preloader</h3>
        <p>Show a Preloader (1:11)</p>
        <p>Step1: get image (0:43)</p>
        <p>Step 2: make component (2:01)</p>
        <p>Step 3: Update App (1:20)</p>
        <p>Step 4: Load styles (1:32)</p>
        <h3>Load and parse your data</h3>
        <p>Asynchronously load data (0:37)</p>
        <p>Step 0: Get data (0:37)</p>
        <p>Step 1: Prep App.js (2:13)</p>
        <p>Step 2: Prep data parsing functions (1:46)</p>
        <p>Step 3: Load the datasets (2:02)</p>
        <p>Step 4: Tie datasets together (1:11)</p>
        <p>Render a choropleth map of the US</p>
        <h3>Render a choropleth map of the US (0:11)</h3>
        <p>Step 1: Prep App.js (3:54)</p>
        <p>Step 2: CountyMap index.js (0:44)</p>
        <p>Step 3: CountyMap CountyMap.js (11:56)</p>
        <p>Step 4: CountyMap County.js (2:03)</p>
        <p>A map appears <span role="img" aria-label="map">🗺</span> (1:26)</p>
        <h3>Render a Histogram of salaries</h3>
        <p>Render a Histogram of salaries (0:23)</p>
        <p>Step 1: Prep App.js (2:24)</p>
        <p>Step 2: CSS changes (0:27)</p>
        <p>Step 3: Histogram component (11:39)</p>
        <p>Step 4: HistogramBar (sub)component (4:00)</p>
        <p>Step 5: Add an axis (4:04)</p>
        <h3>Make it understandable with meta info</h3>
        <p>Add meta info (0:37)</p>
        <p>Dynamic title (9:25)</p>
        <p>Dynamic description (2:58)</p>
        <p>Overlay a median household line (7:47)</p>
        <h3>Add user controls for exploration</h3>
        <p>Add user controls for data slicing and dicing (1:10)</p>
        <p>Step 1: Update App.js (3:49)</p>
        <p>Step 2: Build Controls component (4:26)</p>
        <p>Step 3: Build ControlRow component (3:30)</p>
        <p>Step 4: Build Toggle component (2:39)</p>
        <p>Step 5: Add US state and Job Title filters (3:12)</p>
        <h3>Make it work in the real world</h3>
        <p>Add rudimentary routing (1:51)</p>
        <p>Prep your app for launch</p>
        <p>Twitter and Facebook cards and SEO</p>
        <p>Use full dataset (3:05)</p>
        <p>Launch! <span role="img" aria-label="rocket">🚀</span></p>
        <h3>Animation</h3>
        <p>Intro (0:51)</p>
        <p>Using a game loop for rich animation (1:15)</p>
        <h3>A bouncy ball game loop animation example</h3>
        <p>Begin bouncy ball (0:19)</p>
        <p>Step 1: stub out App and Ball (0:15)</p>
        <p>Stub out BouncingBall (1:11)</p>
        <p>Step 3: Rendering (0:20)</p>
        <p>Step 4: The Game Loop (3:09)</p>
        <p>Step 5: Correcting for time and frame drops (1:18)</p>
        <p>Game loop recap (0:14)</p>
        <h3>Use transitions for simple animation</h3>
        <p>Transition basics (0:27)</p>
        <h3>Build a swipe transition component</h3>
        <p>A swipe transition component (0:47)</p>
        <p>App.js (0:20)</p>
        <p>Ball.js (0:20)</p>
        <p>Ball.js state transition (6:31)</p>
        <p>Enter-update-exit animation</p>
        <h3>Enter-update-exit animation intro</h3>
        <p>Build a declarative animated alphabet</p>
        <p>Project setup</p>
        <p>The Alphabet component</p>
        <p>Declarative render for enter-exit transitions</p>
        <p>TransitionGroup</p>
        <p>The Letter component</p>
        <p>onEnter</p>
        <p>onExit</p>
        <p>componentDidUpdate</p>
        <p>render</p>
        <p>That's it <span role="img" aria-label="thumbs-up">👍🏼</span></p>
        <p>Key transition takeaways</p>
        <h3>Animating with React, Redux, and D3</h3>
        <p>Redux animation intro</p>
        <p>Here's how it works</p>
        <p>Some basic terminology</p>
        <p>3 presentation components</p>
        <p>6 Redux Actions</p>
        <p>1 Container component</p>
        <p>2 Redux Reducers</p>
        <p>What we learned</p>
        <h3>Speed optimizations</h3>
        <p>Speed intro</p>
        <h3>Using canvas</h3>
        <p>Intro</p>
        <p>Why canvas</p>
        <p>Isn't canvas too hard?</p>
        <p>The trouble with Canvas</p>
        <p>Declarative Canvas with Konva and react-konva</p>
        <h3>Smooth animation with 20,000+ elements</h3>
        <p>A particle generator pushed to the max</p>
        <p>Prepare canvas layer</p>
        <p>Use sprites for max redraw speed</p>
        <p>But why so many elements?</p>
        <h3>Build a small interactive canvas game</h3>
        <p>Simulating billiards with MobX, Canvas, and Konva</p>
        <p>Decorators</p>
        <p>Part 0: Some setup</p>
        <p>A quick MobX primer</p>
        <p>Part 1: Rendering our marbles</p>
        <p>Part 2: Building the physics</p>
        <p>Collision detection</p>
        <h3>Speedy React Alternatives</h3>
        <p>Using a React alternative like Preact or Inferno</p>
        <p>Stress test your framework with a recursive fractal</p>
        <p>Stress testing Preact and Inferno</p>
        <h3>Refactor your components with React Hooks</h3>
        <p>An intro to hooks (2:10)</p>
        <p>useState, useEffect, and useContext (1:51)</p>
        <p>useMemo is your new best friend (0:58)</p>
        <p>my useD3 hook (0:34)</p>
        <p>Refactoring our big example to hooks (30:09)</p>
        <h3>Powerful animation with transitions and game loops combined</h3>
        <p>Merging transitions and game loops (2:53)</p>
        <p>Understanding custom tweens (2:38)</p>
        <p>Custom tweens in practice (8:42)</p>
        <p>Use tweens to drive state </p>
        <p>hybrid animation (6:42)</p>
        <h3>You finished! <span role="img" aria-label="rocket">🚀</span></h3>
        <p>You're the best</p>
        <h3>Cookbook: Various visualizations and how to build them</h3>
        <p>Intro to cookbook area</p>
        <p>Christmas trees sold in USA - an emoji barchart</p>
        <p>Money spent on Christmas - a line chart</p>
        <p>Christmas movies at the box office - horizontal bar chart</p>
        <p>What Americans want for Christmas - horizontal stack chart</p>
        <p>Christmas carols and their words - a word cloud</p>
        <p>Will you buy a christmas tree? - a pie chart</p>
        <p>What goes in Christmas stockings - a piechart with tooltips</p>
        <p>When Americans buy Christmas presents - a curved line chart</p>
        <p>When people buy candy - animated barchart with easing</p>
        <p>A responsive stack chart of smartphone market share</p>
        <p>A Sankey diagram</p>
        <p>Try Uber's WebGL dataviz library</p>
        <p>Real-time WebGL map of all airplanes in the world</p>
        <p>A compound arc chart</p>
      </Wrapper>
    )
  }
}

export default TableOfContents
