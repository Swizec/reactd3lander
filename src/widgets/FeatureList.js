import React from 'react'
import styled from 'styled-components'
import pshot1 from '../images/pshot1.png'



const Wrapper = styled.div`
h2 {
  text-align: center;
  }
p {
  font-size: 18px;
  max-width: 400px;
  margin: 0 auto;
}

.boxes {
  img {
  height: 150px;
  margin: 0 auto;
  display: block;
  text-align: center;
}
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
  'b1 b2 b3'
  'b4 b5 b6';

@media (max-width: 940px) {
  grid-template-columns: 1fr;
  grid-template-areas:
  'b1'
  'b2'
  'b3'
  'b4'
  'b5'
  'b6';
  }
}
.box1 {
  grid-area: b1;
}
.box2 {
  grid-area: b2;
}
.box3 {
  grid-area: b3;
}
.box4 {
  grid-area: b4;
}
.box5 {
  grid-area: b5;
}
.box6 {
  grid-area: b6;
}
`;



const FeatureList = props => (
  <Wrapper>
    <h2>Start with the building blocks</h2>
    <div className='boxes'>
    <div className='box1'>
      <img src={pshot1} alt='img'/>
      <p><strong>1.) </strong>Start with the basics. Right in your browser.</p>
    </div>
    <div className='box2'>
      <img src={pshot1} alt='img'/>
      <p><strong>2.) </strong>Learn about blackbox rendering with a reusable axis component. Teaches you all about giving up control, using higher order componnents, and more. You can use this approach to render *anything* inside your React app. Even Vue.</p>
    </div>
    <div className='box3'>
      <img src={pshot1} alt='img'/>
      <p><strong>3.) </strong>Learn full integration rendering with a scatterplot. Use the axis from before, add a bunch of data, then go as far as usinng render props to make your scatterplot shine.</p>
    </div>
    <div className='box4'>
      <img src={pshot1} alt='img'/>
      <p><strong>4.) </strong>Both times youre learning how to make your components reusable. Plug-and-play buildign blocks for your team.</p>
    </div>
    <div className='box5'>
      <img src={pshot1} alt='img'/>
      <p><strong>5.) </strong>Jump into animation with game loops where you learn about havign full control, how to think in frames andn movement. Youll be suprrised how powerful this can be.</p>
    </div>
    <div className='box6'>
      <img src={pshot1} alt='img'/>
      <p><strong>6.) </strong>When full animation is too much, youll need transitiosn. Learn about keyframes and easing functions and makign your animation look antural and smooth.</p>
    </div>
    </div>
  </Wrapper>
)

export default FeatureList