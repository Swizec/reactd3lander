import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import Image from '../widgets/Image'

const Wrapper = styled.div`
  .gatsby-image-wrapper {
    margin: 4rem 0rem 0rem 4rem;
    height: 50px;
  }
  @media (max-width: 940px) {
    .gatsby-image-wrapper {
      margin: 4rem auto 0;
      display: block;
    }
  }

  a {
    background-image: none;
  }
`

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fixed(width: 128, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={({ logo }) => (
      <header>
        <div>
          <Wrapper>
            <Link to="/">
              <Image {...logo.childImageSharp} />
            </Link>
          </Wrapper>
        </div>
      </header>
    )}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
