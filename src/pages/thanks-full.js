import React from "react";
import styled from "styled-components";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Testimonial from "../widgets/Testimonial";
import Test2 from "../images/Test2.jpg";

import cover from "../images/course-cover-small.png";

import YouTube from "react-youtube";

const Wrapper = styled.div`
    max-width: 700px;
    margin: 0rem auto;
    padding: 0 2rem;
    hr {
        margin: 3rem 0;
    }

    h1 {
        text-align: center;
    }
`;

const Cover = styled.img`
    margin: 0 auto;
    width: 300px;
`;

const TypeForm = styled.a`
    display: inline-block;
    text-decoration: none;
    background-color: #267ddd;
    color: white;
    cursor: pointer;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 20px;
    line-height: 50px;
    text-align: center;
    margin: 0;
    height: 50px;
    padding: 0px 33px;
    border-radius: 25px;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
`;

const COURSE_LINK = "https://swizec1.teachable.com/courses/enrolled/447741";

const IndexPage = () => (
    <Layout>
        <SEO
            title="Home"
            keywords={[`gatsby`, `application`, `react`]}
            includeTypeform
        />
        <Wrapper>
            <h1>Thanks for buying React for Data Visualization ❤️</h1>
            <div style={{ textAlign: "center" }}>
                <YouTube videoId="-t27yOeVEik" />
            </div>
            <p>
                Hey thanks again for buying React for Data Visualization. I
                really appreciate it and I hope it helps you on your journey.
            </p>
            <p>Here's what happens next 👇</p>
            <p>
                I just enrolled you in a Teachable course. You should've gotten
                an email about it. If you didn't, click on the cover below. You
                might have to log in.
            </p>
            <p style={{ textAlign: "center" }}>
                <a href={COURSE_LINK}>
                    <Cover
                        src={cover}
                        alt="React for Data Visualization cover"
                    />
                </a>
            </p>
            <p>
                Wanna help me make React for Data Visualization even better?
                Suggest a chapter I should add?
            </p>
            <p>
                Answer 2 quick questions below. Only takes a minute and makes a
                huge difference. Plus you're gonna be one of my favorite humans.
            </p>
            <p style={{ textAlign: "center" }}>
                <TypeForm
                    className="typeform-share button"
                    href="https://swizecteller.typeform.com/to/gzZ4up"
                    data-mode="popup"
                    target="_blank"
                >
                    Answer 2 quick questions{" "}
                </TypeForm>
            </p>
            <Testimonial
                quote="Great read with solid foundations to get you started crawling with react and up to a sprint!"
                image={Test2}
                name="MΛHDI"
                company="Creator of Gyroscope"
            />
        </Wrapper>
    </Layout>
);

export default IndexPage;
