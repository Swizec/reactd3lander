import React, { Component } from "react";
import styled from "styled-components";
import Video from "../widgets/VideoBlock";

import { Title } from "../styles";

const Wrapper = styled.div`
    max-width: 700px;
    margin: 7rem auto;
    margin-top: 0;
    padding: 0 2rem;

    .centered {
        text-align: center;
    }
`;

const P = styled.p`
    max-width: 700px;
    margin: 2rem auto;
    padding: 0 2rem;
`;

export default class Section1 extends Component {
    render() {
        return (
            <React.Fragment>
                <Title>
                    Why use React and D3 for <br />
                    data visualization
                </Title>
                <Wrapper>
                    {/*<img src={BarChart} alt='bc' />*/}

                    <P>
                        I believe React combined with D3 is the best thing
                        that's ever happened to data visualization on the web.
                    </P>
                    <P>
                        React's approach to components makes your code more
                        reusable, its advanced algorithms make it fast, and D3
                        has the best tools for dataviz. Together they represent
                        two of the most popular JavaScript libraries on the web.
                    </P>
                    <P>Watch some of my conference talks for a sneak peek 👇</P>

                    <Video videoId="UP1nCXG2t4M" />
                    <P>
                        The talk shows a proof of concept approach to making
                        fancy animations with React and d3js - a Space Invaders
                        game. I explain the basic approach, where I got the
                        idea, and show off some code.
                    </P>
                    <Video videoId="47uMw-2mb4U" />

                    <P>
                        This talk is more hands on. I show how the animated
                        alphabet, particle generator, and talk about the
                        benefits of componentization when it comes to building
                        modern data visualization.
                    </P>
                    <Video videoId="9JvIyz7uB2s" />

                    <P>
                        You don't have to watch the whole talk, it's all in
                        React for Data Visualization.
                    </P>
                </Wrapper>
            </React.Fragment>
        );
    }
}
