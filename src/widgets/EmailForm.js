import React, { Component } from 'react'
import styled from 'styled-components'


const Wrapper =styled.div`

`

export class EmailForm extends Component {
  render() {
    return (
      <Wrapper>
        <form
        action="https://app.convertkit.com/forms/826419/subscriptions"
        method="post"
        target="_blank"
        data-drip-embedded-form="5362865"
        >
        <input
            type="text"
            placeholder="Enter your email"
            label="Email Address"
            name="fields[email]"
            className="form-control"
        />
        </form>
      </Wrapper>
    )
  }
}

export default EmailForm

