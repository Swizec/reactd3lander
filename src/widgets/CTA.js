import React from 'react'
import {Link} from 'gatsby'
import styled from 'styled-components'
import CTATestimonial from './CTATestimonial'
import Test3 from '../images/Test3.jpg'
import Test5 from '../images/Test5.png'
import Test6 from '../images/Test6.jpg'
import Test8 from '../images/Test8.png'
import Test2 from '../images/Test2.jpg'
import PerWiklander from '../images/perwiklander.jpeg'

const Container = styled.div`
  text-decoration: none;
  max-width: 700px;
  margin: auto auto;
  text-align: center;
  /* border-top: 1px solid #e3e3e3; */
  margin-bottom: 50px;
  
  h3 {
    padding-top: 1rem;
    margin: auto auto !important;
  }

  p {
    padding-top: 20px;
    margin-bottom: -20px;
  }

  a {
    display: block;
    background-image: none;
    margin-top: -20px;
  }

  button {
    background-color: #ff871c;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: #d66a12 0 5px 0;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 20px;
    font-weight: 900;
    line-height: 1.42857;
    margin-bottom: 0;
    padding: 10px 20px;
  }
`

const testimonials = [
  {
    quote: "I'm starting a new position where I will focus on data visualization using React and d3. I got everything I needed from the book, your examples were straight forward and easy to follow. Thanks!",
    name: "Aristides Staffieri",
    company: "Engineer at ProtectWise",
    image: Test3,
  },
  {
    quote: "I use React because it is the sane way of doing things. I use D3 because I have to. I want nice interactive charts. I want to stay sane.",
    name: "Per",
    company: "Frontend Consultant",
    image: PerWiklander,
  },
  {
    quote: "The examples in V4 are off the hook. No wonder its been so much work, you have really extended the learning process into fun, interactive projects. I was specifically trying to learn topojson an map visualizations! What a breeze!",
    name: "Julio Gudiño",
    company: "Frontend Developer",
    image: Test5,
  },
  {
    quote: "I love having practical examples to help me learn new things faster. D3's docs alone are okay but marrying them with React (as a react newbie) is not as straightforward as someone handholding you through the process. And, since I don't have hours after work or on weekends to hack on things like I used to before I was married (or had kids), I need to optimize my learning.",
    name: "Paulo Elias",
    company: "Self Taught Developer",
    image: Test6,
  },
  {
    quote: "A sharply written work that delivers technical information in a conversational and easy to digest manner.",
    name: "Malcolm Maclean",
    company: "Author of D3 Tips & Tricks",
    image: Test8,

  },
  {
    quote: "Great read with solid foundations to get you started crawling with react and up to a sprint!",
    name: "MΛHDI",
    company: "Creator of Gyroscope",
    image: Test2,
  }
]

const CTA = () => {
  const selectedTestimonial = testimonials[ Math.floor(Math.random() * testimonials.length) ];

  return (
    <Container>
      <h3>
        Stop copy pasting D3 examples, create data visualizations of your own
      </h3>
      <p>
        Learn how to build scalable dataviz components your whole team can understand with React for Data Visualization.
      </p>
      <CTATestimonial
        quote   = {selectedTestimonial.quote}
        name    = {selectedTestimonial.name}
        company = {selectedTestimonial.company}
        image   = {selectedTestimonial.image}
      />
      <Link to="/">
        <button>Get Started</button>
      </Link>
    </Container>
  );
}

export default CTA;