import React, { Component } from "react";
import styled from "styled-components";
//import BarChart from '../images/BarChart.png'
import VideoBlock from "../widgets/VideoBlock";

const Wrapper = styled.div`
    max-width: 1000px;
    margin: 7rem auto;
    padding: 0 2rem;
    img {
        height: 300px;
        display: block;
        margin: 0 auto;
    }
    h2 {
        text-align: center;
    }
    p.description {
        font-size: 18px;
    }
    .videocase {
        display: grid;
        grid-gap: 4rem;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas: "V1 V2 V3";
        .Video1 {
            grid-area: V1;
        }
        .Video2 {
            grid-area: V2;
        }
        .Video3 {
            grid-area: V3;
        }
        @media (max-width: 940px) {
            grid-template-columns: 1fr;
            grid-template-areas:
                "V1"
                "V2"
                "V3";
        }
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
            <Wrapper>
                {/*<img src={BarChart} alt='bc' />*/}
                <h2>Why reusable data visualization with React and D3</h2>
                <P>
                    I believe React combined with D3 is the best thing that's
                    ever happened to data visualization on the web.
                </P>
                <P>
                    React's approach to components makes your code more
                    reusable, its advanced algorithms make it fast, and D3 has
                    the best tools for dataviz. Together they represent two of
                    the most popular JavaScript libraries on the web.
                </P>
                <P>Watch some of my conference talks for a sneak peek 👇</P>
                <div className="videocase">
                    <div className="Video1">
                        <VideoBlock
                            video={
                                <iframe
                                    className="youtubevid"
                                    title="This is a unique title"
                                    width="260"
                                    height="315"
                                    src="https://www.youtube.com/embed/UP1nCXG2t4M"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                />
                            }
                        />
                        <p className="description">
                            The talk shows a proof of concept approach to making
                            fancy animations with React and d3js - a Space
                            Invaders game. I explain the basic approach, where I
                            got the idea, and show off some code.
                        </p>
                    </div>
                    <div className="Video2">
                        <VideoBlock
                            video={
                                <iframe
                                    className="youtubevid"
                                    title="This is a unique title"
                                    width="260"
                                    height="315"
                                    src="https://www.youtube.com/embed/47uMw-2mb4U"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                />
                            }
                        />
                        <p className="description">
                            This talk is more hands on. I show how the animated
                            alphabet, particle generator, and talk about the
                            benefits of componentization when it comes to
                            building modern data visualization.
                        </p>
                    </div>
                    <div className="Video3">
                        <VideoBlock
                            video={
                                <iframe
                                    className="youtubevid"
                                    title="This is a unique title"
                                    width="260"
                                    height="315"
                                    src="https://www.youtube.com/embed/9JvIyz7uB2s"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                />
                            }
                        />
                        <p className="description">
                            You don't have to watch the whole talk, it's all in
                            React for Data Visualization.
                        </p>
                    </div>
                </div>
            </Wrapper>
        );
    }
}
