import React from "react"
import styled from 'styled-components'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../widgets/Hero";
import Section1 from "../widgets/Section1";
import Section2 from "../widgets/Section2";
import Section3 from "../widgets/Section3";
import Section4 from "../widgets/Section4";
import Section5 from "../widgets/Section5";
import Section6 from "../widgets/Section6";
import About from "../widgets/About";
import FaqSection from "../widgets/FaqSection";
import Pricing from "../widgets/Pricing";
import TableOfContents from "../widgets/TableOfContents";
import Testimonial from "../widgets/Testimonial";
import Test1 from '../images/Test1.jpg'

const Wrapper = styled.div`
hr {
  margin: 3rem 0;
}

`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Wrapper>
      <Hero/>
      <Section1/>
      <Testimonial
        quote="I'm starting a new position where I will focus on data visualization using React and d3. I got everything I needed from the book, your examples were straight forward and easy to follow. Thanks!"
        image={Test1}
        name='Aristides Staffieri'
        company='Engineer at ProtectWise'
      />
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Section6/>
      <TableOfContents/>
      <About/>
      <Pricing/>
      <FaqSection/>
    </Wrapper>
  </Layout>
)

export default IndexPage
