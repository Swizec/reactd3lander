import React from 'react'
import PropTypes from 'prop-types'
import Header from '../components/header'
import './layout.css'

const Layout = ({ children }) => (
  <>
    <Header />
    <div>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="https://swizec.com/">Swizec</a> with ❤️
      </footer>
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
