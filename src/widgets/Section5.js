import React, { Component } from "react";
import styled from "styled-components";
//import BarChart from '../images/BarChart.png'
import FeatureList from "../widgets/FeatureList";

const Wrapper = styled.div`
    max-width: 1000px;
    margin: 7rem auto;
    padding: 0 2rem;
    img {
        height: 300px;
        display: block;
        margin: 0 auto;
    }
    .iframe-container {
        margin: 0 auto;
        display: block;
        text-align: center;
    }
    @media (max-width: 940px) {
        .iframe-container {
        }
    }
`;

export default class Section6 extends Component {
    render() {
        return (
            <Wrapper>
                <FeatureList />
            </Wrapper>
        );
    }
}
