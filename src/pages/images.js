import React, { Component } from 'react'
import metaimage from '../images/metaimage.png'

export default class images extends Component {
  render() {
    return (
      <div>
        <img src={metaimage} alt='meta'/>
      </div>
    )
  }
}
