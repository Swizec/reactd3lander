import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Div = styled.div`
  text-align: center;

  a {
    background-color: #ff871c;
    line-height: 1.8;
    color: #fff;
    box-shadow: 0 3px 0 rgb(214, 106, 18);
    text-decoration: none;

    display: inline-block;
    margin-bottom: 0;
    font-weight: 900;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 10px 20px;
    font-size: 20px;
    line-height: 1.42857143;
    border-radius: 4px;
    text-shadow: none !important;
    position: relative;
  }

  a:hover {
    background: orange;
  }
`

export default ({ to, children, style }) => (
  <Div style={style}>
    <Link to={to}>{children}</Link>
  </Div>
)
