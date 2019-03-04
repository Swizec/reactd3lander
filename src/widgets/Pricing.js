import React, { Component } from "react";
import styled from "styled-components";
import PriceBox from "../widgets/PriceBox.js";
import PriceBoxSpecial from "../widgets/PriceBoxSpecial.js";

const Wrapper = styled.div`
    height: 100%;
    margin: 7rem 0rem;
`;
const WrapperBlock = styled.div`
    max-width: 100%;
    margin: 0 auto;
    text-align: center;
    @media (max-width: 940px) {
        font-size: 20px;
    }
`;

export class Pricing extends Component {
    render() {
        return (
            <Wrapper>
                <WrapperBlock>
                    PACKAGES AND BUY BUTTONS HERE
                    {/* <PriceBox
                        price={
                            <div class="price">
                                <span class="curr">$</span>49
                            </div>
                        }
                        plan="BOOK"
                        features={
                            <div>
                                React+D3v4 [PDF/epub/mobi]
                                <br />3 recap videos
                                <br />7 full projects
                                <br />
                                Weekly livecoding sessions
                                <br />
                                Free updates
                                <br />
                                Money-back guarantee
                            </div>
                        }
                        button={
                            <a href="/" class="btn btn-grey btn-min-width">
                                PRE-ORDER
                            </a>
                        }
                    />
                    <PriceBox
                        price={
                            <div class="price">
                                {" "}
                                <span class="curr">$</span>149
                            </div>
                        }
                        plan="BOOK + COURSE"
                        features={
                            <div>
                                React+D3v4 [PDF/epub/mobi]
                                <br />3 recap videos
                                <br />4 full HD screencasts
                                <br />7 full projects
                                <br />
                                Weekly livecoding sessions
                                <br />
                                Interactive course
                                <br />
                                Free updates
                                <br />
                                Money-back guarantee
                            </div>
                        }
                        button={
                            <a href="/" class="btn btn-grey btn-min-width">
                                PRE-ORDER
                            </a>
                        }
                    />
                    <PriceBoxSpecial
                        price={
                            <div class="price">
                                {" "}
                                <span class="curr">$</span>399
                            </div>
                        }
                        plan={
                            <div>
                                <p>
                                    <strong>BOOK + COURSE</strong>
                                </p>
                                <p>
                                    <strong>+ coaching</strong>
                                </p>
                            </div>
                        }
                        features={
                            <div>
                                React+D3v4 [PDF/epub/mobi]
                                <br />3 recap videos
                                <br />4 full HD screencasts
                                <br />7 full projects
                                <br />
                                Weekly livecoding sessions
                                <br />
                                Interactive course
                                <br />1 week personal coaching
                                <br />
                                Free updates
                                <br />
                                Money-back guarantee
                            </div>
                        }
                        button={
                            <a href="/" class="btn btn-grey btn-min-width">
                                PRE-ORDER
                            </a>
                        }
                    /> */}
                </WrapperBlock>
            </Wrapper>
        );
    }
}

export default Pricing;
