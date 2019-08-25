import React from 'react'
import styled from 'styled-components'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Hero from '../widgets/Hero'
import Section1 from '../widgets/Section1'
import Section2 from '../widgets/Section2'
import Section3 from '../widgets/Section3'
import Section4 from '../widgets/Section4'
import Section5 from '../widgets/Section5'
import Section6 from '../widgets/Section6'
import About from '../widgets/About'
import FaqSection from '../widgets/FaqSection'
import Pricing from '../widgets/Pricing'
import TableOfContents from '../widgets/TableOfContents'
import Testimonial from '../widgets/Testimonial'
import Test3 from '../images/Test3.jpg'
import Test5 from '../images/Test5.png'
import Test6 from '../images/Test6.jpg'
import Test8 from '../images/Test8.png'
import Test2 from '../images/Test2.jpg'
import PerWiklander from '../images/perwiklander.jpeg'
import EmailSignup from '../widgets/EmailSignup'
import EmailHeaderText from '../widgets/EmailHeaderText'
import EmailForm from '../widgets/EmailForm'
import EmailSubmit from '../widgets/EmailSubmit'
import CopyBlock from '../widgets/CopyBlock'

const Wrapper = styled.div`
  hr {
    margin: 3rem 0;
  }
`

const IndexPage = () => {
  return (
    <Layout>
      <SEO
        title="React for Data Visualization"
        keywords={[`d3`, `data visualization`, `react`, `dataviz`]}
      />
      <Wrapper>
        <Hero />
        <Section1 />
        <Testimonial
          quote="I'm starting a new position where I will focus on data visualization using React and d3. I got everything I needed from the book, your examples were straight forward and easy to follow. Thanks!"
          image={Test3}
          name="Aristides Staffieri"
          company="Engineer at ProtectWise"
        />
        <CopyBlock />
        <Section2 />
        <Testimonial
          quote="I use React because it is the sane way of doing things. I use D3 because I have to. I want nice interactive charts. I want to stay sane."
          image={PerWiklander}
          name="Per"
          company="Frontend Consultant"
        />
        <Section3 />
        <Section4 />
        <Section5 />
        <Testimonial
          quote="The examples in V4 are off the hook. No wonder its been so much work, you have really extended the learning process into fun, interactive projects. I was specifically trying to learn topojson an map visualizations! What a breeze!"
          image={Test5}
          name="Julio Gudiño"
          company="Frontend Developer"
        />
        <Section6 />
        <TableOfContents />
        <Pricing />
        <EmailSignup
          header={<EmailHeaderText />}
          input={<EmailForm />}
          submit={<EmailSubmit />}
        />
        <Testimonial
          quote="I love having practical examples to help me learn new things faster. D3's docs alone are okay but marrying them with React (as a react newbie) is not as straightforward as someone handholding you through the process. And, since I don't have hours after work or on weekends to hack on things like I used to before I was married (or had kids), I need to optimize my learning."
          image={Test6}
          name="Paulo Elias"
          company="Self Taught Developer"
        />
        <About />
        <CopyBlock />
        <Testimonial
          quote="A sharply written work that delivers technical information in a conversational and easy to digest manner."
          image={Test8}
          name="Malcolm Maclean"
          company="Author of D3 Tips & Tricks"
        />
        <Pricing />
        <FaqSection />
        <Testimonial
          quote="Great read with solid foundations to get you started crawling with react and up to a sprint!"
          image={Test2}
          name="MΛHDI"
          company="Creator of Gyroscope"
        />
      </Wrapper>
    </Layout>
  )
}

export default IndexPage
