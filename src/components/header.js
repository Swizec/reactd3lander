import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from 'styled-components'

import logo from '../images/logo.png'

const Wrapper = styled.div`
img {
  margin: 4rem 0rem 0rem 4rem;
  height: 50px;
}
@media (max-width: 940px) {
  img {
    margin: 4rem auto 0;
    display: block;
  }
}
`

const Header = ({ siteTitle }) => (
  <header>
    <div>
      <Wrapper>
        <Link
          to="/">
          <img src={logo} alt='logo'/>
        </Link>
      </Wrapper>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
