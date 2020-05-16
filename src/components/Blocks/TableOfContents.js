import React, { Component } from 'react'
import styled from '@emotion/styled'
import Topic from './Topic'

import christmasTree from '../../images/christmas-trees.gif'
import moneySpentChristmas from '../../images/money-spent-christmas.png'
import christmasMovies from '../../images/christmas-movies.gif'
import whatAmericasWhant from '../../images/what-americas-want.png'
import christmasCarols from '../../images/christmas-carols.png'
import willYouBuyChritmasTree from '../../images/will-you-buy-christmas-tree.png'
import christmasStockings from '../../images/christmas-stockings.png'
import whenChristmasStart from '../../images/when-christmas-start.png'
import weeklyCandyRetails from '../../images/weekly-candy-retails.gif'
import responsiveStackChart from '../../images/responsive-stack-chart.png'
import sankey from '../../images/sankey.png'
import compoundArc from '../../images/compound-arc.png'
import emailsJoy from '../../images/emails-joy.gif'
import mooresLaw from '../../images/moores-law.gif'
import mondrian from '../../images/mondrian.gif'


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
        <Topic
          title="Introduction (14:22)"
          content={
            [
              "Hello new friend 👋 (6:08)",
              "What you need to know (2:16)",
              "How to approach React for Dataviz (3:16)",
              "Why React and D3",
              "Buzzword soup explainedr",
              "JSX",
              "What you'll build (2:30)",
            ]
          }
        />
        <Topic
          title="A quick intro to D3 (17:15)"
          content={
            [
              "3 key insights to learn D3 from scratch (2:23)",
              "Data vs.DOM manipulation (6:07)",
              "Scales (4: 12)",
              "D3 layouts (1:41)",
              "Recap (1:49)",
            ]
          }
        />
        <Topic
          title="How React makes D3 easier (11:46)"
          content={
            [
              "React + D3 = ❤️ (4:53)",
              "What about existing libraries? (2:13)",
              "Victory.js (1:04)",
              "Recharts (0:54)",
              "Nivo (1:11)",
              "VX (1:07)",
              "When you shouldn't use a library (1:14)",
            ]
          }
        />
        <Topic
          title="Quickly integrate any D3 code in your React project with Blackbox Components (17:29)"
          content={
            [
              "The idea behind blackbox components (0:57)",
              "A quick blackbox example - a D3 axis (3:36)",
              "A React + D3 axis (5:19)",
              "A D3 blackbox higher order component - HOC (2:26)",
              "D3blackbox magic trick - render anything in 30 seconds (5:11)",
            ]
          }
        />
        <Topic
          title="Build scalable dataviz components with full integration (24:02)"
          content={
            [
              "The approach (1:52)",
              "When props don't change - a scatterplot (9:26)",
              "A scatterplot When props do change (6:36)",
              "Making your components more flexible with render props (6:08)",
            ]
          }
        />
        <Topic
          title="You're awesome"
          content={
            [
              "💪",
            ]
          }
        />
        <Topic
          title="A note about state and app structure (2:59)"
          content={
            [
              "Handling state in your React app (0:48)",
              "Basic architecture we'll use (2:11)",
              "What about React Context? Redux? MobX?",
              "How to structure your app",
              "Congratz!",
            ]
          }
        />
        <Topic
          title="Set up a local environment with create-react-app (1:53)"
          content={
            [
              "Local environment setup",
              "Start with create-react-app (1:10)",
              "What you get",
              "Install extra dependencies (0:43)",
            ]
          }
        />
        <Topic
          title="176,113 tech salaries visualized – a dataviz dashboard (2:54)"
          content={
            [
              "176,113 tech salaries visualized (2:54)",
            ]
          }
        />
        <Topic
          title="Show a Preloader (6:47)"
          content={
            [
              "Show a Preloader (1:11)",
              "Step 1: get image (0:43)",
              "Step 2: make component (2:01)",
              "Step 3: Update App (1:20)",
              "Step 4: Load styles (1:32)",
            ]
          }
        />
        <Topic
          title="Load and parse your data (8:26)"
          content={
            [
              "Asynchronously load data",
              "Step 1: Get data",
              "Step 2: Prep App.js (2:13)",
              "Step 3: Prep data parsing functions (1:46)",
              "Step 4: Load the datasets (2:02)",
              "Step 5: Tie datasets together (1:11)",
              "Render a choropleth map of the US (0:11)",
            ]
          }
        />
        <Topic
          title="Render a choropleth map of the US (20:14)"
          content={
            [
              "Step 1: Prep App.js (3:54)",
              "Step 2: CountyMap index.js (0:44)",
              "Step 3: CountyMap CountyMap.js (11:56)",
              "Step 4: CountyMap County.js (2:03)",
              "A map appears 🗺 (1:26)",
            ]
          }
        />
        <Topic
          title="Render a Histogram of salaries (22:57)"
          content={
            [
              "Render a Histogram of salaries",
              "Step 1: Prep App.js (2:24)",
              "Step 2: CSS changes (0:27)",
              "Step 3: Histogram component (11:39)",
              "Step 4: HistogramBar (sub)component (4:00)",
              "Step 5: Add an axis (4:04)",
            ]
          }
        />
        <Topic
          title="Make it understandable with meta info (20:47)"
          content={
            [
              "Add meta info",
              "Dynamic title (9:25)",
              "Dynamic description (2:58)",
              "Overlay a median household line (7:47)",
            ]
          }
        />
        <Topic
          title="Add user controls for exploration (18:46)"
          content={
            [
              "Add user controls for data slicing and dicing (1:10)",
              "Step 1: Update App.js (3:49)",
              "Step 2: Build Controls component (4:26)",
              "Step 3: Build ControlRow component (3:30)",
              "Step 4: Build Toggle component (2:39)",
              "Step 5: Add US state and Job Title filters (3:12)",
            ]
          }
        />
        <Topic
          title="Make it work in the real world (4:56)"
          content={
            [
              "Add rudimentary routing (1:51)",
              "Prep your app for launch",
              "Twitter and Facebook cards and SEO",
              "Use full dataset (3:05)",
              "Launch! 🚀",
            ]
          }
        />
        <Topic
          title="Animation (2:06)"
          content={
            [
              "Intro (0:51)",
              "Using a game loop for rich animation (1:15)",
            ]
          }
        />
        <Topic
          title="A bouncy ball game loop animation example (6:46)"
          content={
            [
              "Step 1: stub out App and Ball",
              "Step 2: Stub out BouncingBall (1:11)",
              "Step 3: Rendering",
              "Step 4: The Game Loop (3:09)",
              "Step 5: Correcting for time and frame drops (1:18)",
              "Game loop recap",
            ]
          }
        />
        <Topic
          title="Use transitions for simple animation (0:27)"
          content={
            [
              "Transition basics"
            ]
          }
        />
        <Topic
          title="Build a swipe transition component (7:58)"
          content={
            [
              "A swipe transition component (0:47)",
              "App.js",
              "Ball.js",
              "Ball.js state transition (6:31)",
            ]
          }
        />
        <Topic
          title="Enter-update-exit animation"
          content={
            [
              "Build a declarative animated alphabet",
              "Project setup",
              "The Alphabet component",
              "Declarative render for enter-exit transitions",
              "TransitionGroup",
              "The Letter component",
              "onEnter",
              "onExit",
              "componentDidUpdate",
              "render",
              "That's it 👍🏼",
              "Key transition takeaways",
            ]
          }
        />
        <Topic
          title="Animating with React, Redux, and D3"
          content={
            [
              "Redux animation intro",
              "Here's how it works",
              "Some basic terminology",
              "3 presentation components",
              "6 Redux Actions",
              "1 Container component",
              "2 Redux Reducers",
              "What we learned",
            ]
          }
        />
        <Topic
          title="Speed optimizations"
          content={
            [
              "Speed intro",
            ]
          }
        />
        <Topic
          title="Using canvas"
          content={
            [
              "Intro",
              "Why canvas",
              "Isn't canvas too hard?",
              "The trouble with Canvas",
              "Declarative Canvas with Konva and react-konva",
            ]
          }
        />
        <Topic
          title="Smooth animation with 20,000+ elements"
          content={
            [
              "A particle generator pushed to the max",
              "Prepare canvas layer",
              "Use sprites for max redraw speed",
              "But why so many elements?",
            ]
          }
        />
        <Topic
          title="Build a small interactive canvas game"
          content={
            [
              "Simulating billiards with MobX, Canvas, and Konva",
              "Decorators",
              "Part 1: Some setup",
              "A quick MobX primer",
              "Part 2: Rendering our marbles",
              "Part 3: Building the physics",
              "Collision detection",
            ]
          }
        />
        <Topic
          title="Speedy React Alternatives"
          content={
            [
              "Using a React alternative like Preact or Inferno",
              "Stress test your framework with a recursive fractal",
              "Stress testing Preact and Inferno",
            ]
          }
        />
        <Topic
          title="Refactor your components with React Hooks (35:42)"
          content={
            [
              "An intro to hooks (2:10)",
              "useState, useEffect, and useContext (1:51)",
              "useMemo is your new best friend (0:58)",
              "my useD3 hook (0:34)",
              "Refactoring our big example to hooks (30:09)",
            ]
          }
        />
        <Topic
          title="Powerful animation with transitions and game loops combined (20:56)"
          content={
            [
              "Merging transitions and game loops (2:53)",
              "Understanding custom tweens (2:38)",
              "Custom tweens in practice (8:42)",
              "Use tweens to drive state",
              "hybrid animation (6:42)",
            ]
          }
        />
        <Topic
          title="You finished! 🚀"
          content={
            [
              "You're the best"
            ]
          }
        />
        <Topic
          title="Cookbook: Various visualizations and how to build them"
          content={
            [
              "Intro to cookbook area",
              "Christmas trees sold in USA - an emoji barchart",
              "Money spent on Christmas - a line chart",
              "Christmas movies at the box office - horizontal bar chart",
              "What Americans want for Christmas - horizontal stack chart",
              "Christmas carols and their words - a word cloud",
              "Will you buy a christmas tree? - a pie chart",
              "What goes in Chrstmas stockings - a piechart with tooltips",
              "When Americans buy Christmas presents - a curved line chart",
              "When people buy candy - animated barchart with easing",
              "A responsive stack chart of smartphone market share",
              "A Sankey diagram",
              "Try Uber's WebGL dataviz library",
              "Real-time WebGL map of all airplanes in the world",
              "A compound arc chart",
              "Which emails sparked joy – an animated timeline",
              "A barchart race visualizing Moore's Law",
              "Building a Piet Mondrian art generator with treemaps",
              <img src={christmasTree}           title="Christmas trees sold in USA - an emoji barchart"             alt="Christmas trees sold in USA - an emoji barchart"             loading="lazy" />,
              <img src={moneySpentChristmas}     title="Money spent on Christmas - a line chart"                     alt="Money spent on Christmas - a line chart"                     loading="lazy" />,
              <img src={christmasMovies}         title="Christmas movies at the box office - horizontal bar chart"   alt="Christmas movies at the box office - horizontal bar chart"   loading="lazy" />,
              <img src={whatAmericasWhant}       title="What Americans want for Christmas - horizontal stack chart"  alt="What Americans want for Christmas - horizontal stack chart"  loading="lazy" />,
              <img src={christmasCarols}         title="Christmas carols and their words - a word cloud"             alt="Christmas carols and their words - a word cloud"             loading="lazy" />,
              <img src={willYouBuyChritmasTree}  title="Will you buy a christmas tree? - a pie chart"                alt="Will you buy a christmas tree? - a pie chart"                loading="lazy" />,
              <img src={christmasStockings}      title="What goes in Chrstmas stockings - a piechart with tooltips"  alt="What goes in Chrstmas stockings - a piechart with tooltips"  loading="lazy" />,
              <img src={whenChristmasStart}      title="When Americans buy Christmas presents - a curved line chart" alt="When Americans buy Christmas presents - a curved line chart" loading="lazy" />,
              <img src={weeklyCandyRetails}      title="When people buy candy - animated barchart with easing"       alt="When people buy candy - animated barchart with easing"       loading="lazy" />,
              <img src={responsiveStackChart}    title="A responsive stack chart of smartphone market share"         alt="A responsive stack chart of smartphone market share"         loading="lazy" />,
              <img src={sankey}                  title="A Sankey diagram"                                            alt="A Sankey diagram"                                            loading="lazy" />,
              <img src={compoundArc}             title="A compound arc chart"                                        alt="A compound arc chart"                                        loading="lazy" />,
              <img src={emailsJoy}               title="Which emails sparked joy – an animated timeline"             alt="Which emails sparked joy – an animated timeline"             loading="lazy" />,
              <img src={mooresLaw}               title="A barchart race visualizing Moore's Law"                     alt="A barchart race visualizing Moore's Law"                     loading="lazy" />,
              <img src={mondrian}                title="Building a Piet Mondrian art generator with treemaps"        alt="Building a Piet Mondrian art generator with treemaps"        loading="lazy" />,
            ]
          }
        />
      </Wrapper>
    )
  }
}

export default TableOfContents
