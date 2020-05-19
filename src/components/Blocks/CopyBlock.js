import React from 'react'
import styled from "@emotion/styled"

const Wrapper = styled.div`
  background-color: #f77b12;
  background-image: linear-gradient(45deg, #f77b12 37%, #ffe32c 100%);

  color: #fff;
  text-align: center;
  text-shadow: 1px 0px rgba(0, 0, 0, 0.4);
  padding: 4rem 0;
  margin: 7rem 0;

  h1 {
    color: #fff;
    text-align: center;
    text-shadow: 1px 0px rgba(0, 0, 0, 0.4);
    font-size: 3em;
  }
`

const CopyBlock = () => (
    <Wrapper>
        <h1>94+ Full HD videos</h1>
        <p>
            Watching code appear before your eyes makes it easier to understand.
        </p>
    </Wrapper>
)

export default CopyBlock
