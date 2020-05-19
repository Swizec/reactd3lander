import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const Div = styled.div`
  text-align: center;

  a {
    background-color: #ff871c;
    background-image: none;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 3px 0 rgb(214, 106, 18);
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    font-weight: 900;
    line-height: 1.42857143;
    line-height: 1.8;
    margin-bottom: 0;
    padding: 5px 10px;
    position: relative;
    text-align: center;
    text-decoration: none;
    text-shadow: none !important;
    vertical-align: middle;
    white-space: nowrap;
  }

  a:hover {
    background: orange;
  }

  @media (min-width: 940px) {
    a {
      font-size: 20px;
      padding: 10px 20px;
    }
  }
`

export default ({ to, style }) => (
  <Div style={style}>
    <Link to={to}>
        <span role="img" aria-label="finger-down">👇</span> Jump into ReactForDataviz<span role="img" aria-label="finger-down">👇</span>
    </Link>
  </Div>
)
