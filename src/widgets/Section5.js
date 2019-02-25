import React, { Component } from 'react'
import styled from 'styled-components'
//import BarChart from '../images/BarChart.png'
import FeatureList from '../widgets/FeatureList'




const Wrapper = styled.div`
max-width: 700px;
margin: 7rem auto;
padding: 0 2rem;
img {
    height: 300px;
    display: block;
    margin: 0 auto;
}
.iframe-container {
margin: 0 auto;
display: block;
text-align: center;
}
@media (max-width: 940px) {
  .iframe-container {
    
  }
}
`;


export default class Section6 extends Component {
  render() {
    return (
      <Wrapper>
        {/*<img src={BarChart} alt='bc' />*/}
        
        <div class="iframe-container">
          <iframe
              src="https://codesandbox.io/embed/km3l21y60r"
              title="This is a unique title"
              style={{
                  width: 800,
                  height: 500,
                  border: 0,
                  borderRadius: 4,
                  overflow: "hidden",
              }}
              sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
          />
          </div>
          
        <FeatureList 
            title='Start with the building blocks'
            feature1='Start with the basics. Right in your browser.'
            feature2='Learn about blackbox rendering with a reusable axis component. Teaches you all about giving up control, using higher order componnents, and more. You can use this approach to render *anything* inside your React app. Even Vue.'
            feature3='Learn full itnegration renderign with a scatterplot. Use the axis from before, add a bunch of data, then go as far as usinng render props to make your scatterplot shine.'
            feature4='Both times youre learning how to make your components reusable. Plug-and-play buildign blocks for your team.'
            feature5='Jump into animation with game loops where you learn about havign full control, how to think in frames andn movement. Youll be suprrised how powerful this can be.'
            feature6='When full animation is too much, youll need transitiosn. Learn about keyframes and easing functions and makign your animation look antural and smooth.'
            
        />
  
      </Wrapper>
    )
  }
}
