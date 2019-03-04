import React, { Component } from "react";
import FAQ from "../widgets/Faq";
import styled from "styled-components";
import TweetEmbed from "react-tweet-embed";

const Wrapper = styled.div`
    max-width: 700px;
    margin: 7rem auto;
    padding: 0 2rem;
    h2 {
        margin: 0;
    }
`;

export class FaqSection extends Component {
    render() {
        return (
            <Wrapper>
                <h2>FAQ</h2>
                <FAQ
                    question="IS REACT FOR DATA VISUALIZATION FOR ME?"
                    answer={<TweetEmbed id="1095042940513050624" />}
                />
                <FAQ
                    question="WHICH PACKAGE SHOULD I CHOOSE?"
                    answer="coming soon"
                />
                <FAQ
                    question="I DON'T LIKE REACT. IS REACT FOR DATA VISUALIZATION STILL USEFUL?"
                    answer="Yes! You can apply the core ideas behind React for Data Visualization to any modern framework. Angular, Vue, or anything else that aims to separate business and rendering logic with a declarative approach."
                />
                <FAQ
                    question="WHAT IF I HATE YOUR COURSE?"
                    answer="Send me an email and I'll click the magic refund button. You even get to keep the downloadable resources."
                />
            </Wrapper>
        );
    }
}

export default FaqSection;
