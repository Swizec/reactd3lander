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
      <hr></hr>
      <Section2/>
      <hr></hr>
      <Section3/>
      <hr></hr>
      <Section4/>
      <hr></hr>
      <Section5/>
      <hr></hr>
      <Section6/>
    </Wrapper>
  </Layout>
)

export default IndexPage
