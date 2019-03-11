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
                    answer={
                        <p>
                            Yes! You can apply the core ideas behind React for
                            Data Visualization to any modern framework. Angular,
                            Vue, or anything else that aims to separate business
                            and rendering logic with a declarative approach.
                        </p>
                    }
                />
                <FAQ
                    question="WHAT IF I HATE YOUR COURSE?"
                    answer={
                        <p>
                            Send me an email and I'll click the magic refund
                            button. You even get to keep the downloadable
                            resources.
                        </p>
                    }
                />
                <FAQ
                    question="How does this compare to React + D3v4?"
                    answer={
                        <>
                            <p>
                                A lot of the underlying principles are still the
                                same. I've updated a lot of the code itself so
                                it fits modern React and D3 versions. There's a
                                whole new chapter on React Hooks. Also a chapter
                                on existing React+D3 libraries to help you
                                decide if you'd prefer using a library instead
                                of rolling your own.
                            </p>
                            <p>
                                I also discovered a new hybrid approach to
                                transitions/animation that I'm adding a chapter
                                for this week. And I plan to add a chapter on
                                React Native and WebGL. There's also a new
                                section with 14 cookbook-like projects you can
                                explore.
                            </p>
                            <p>
                                Oh and most everything comes with video now.
                                About 9 hours of video content for the core
                                content and another 10 or so for the cookbook
                                projects.
                            </p>
                        </>
                    }
                />
            </Wrapper>
        );
    }
}

export default FaqSection;
