import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding-bottom: 10px;

  h2 {
    margin: auto auto !important;
    padding-bottom: 10px;
    text-align: left !important;
  }

  a {
    font-size: 26px;
    padding-right: 20px;
    text-decoration: none;
    background: 0;
  }
`;

const SparkJoy = ({pathname}) => {
  const url = `https://reactfordataviz.com/${pathname}`;
  const sparkJoyId = '50c48f9e-66bd-47d0-9c78-4865719ad305';

  return <Container>
    <style></style>
    <div className="Widget__WidgetLayout-sc-1ityn2x-2 cJHITu">
      <h2>
        Did you enjoy this dataviz article?
      </h2>
      <div className="styles__Flex-sc-1lygi1f-2 biiuQx">
        <a
          href={`https://spark-joy.netlify.com/${sparkJoyId}/thumbsdown?instanceOfJoy=${url}`}
          className="Widget__RoundButton-sc-1ityn2x-1 caphDb"
        >
          <span role="img" aria-label="thumbs-down">
            👎
          </span>
        </a>
        <a
          href={`https://spark-joy.netlify.com/${sparkJoyId}/thumbsup?instanceOfJoy=${url}`}
          className="Widget__RoundButton-sc-1ityn2x-1 caphDb"
        >
          <span role="img" aria-label="thumbs-up">
            👍
          </span>
        </a>
      </div>
    </div>
  </Container>
}

export default SparkJoy;