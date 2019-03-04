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
                    <PriceBox
                        price={
                            <div class="price">
                                <span class="curr">$</span>49
                            </div>
                        }
                        plan="Basics course"
                        features={
                            <div>
                                A quick intro to D3
                                <br />
                                How React makes D3 easier
                                <br />
                                Quick React+D3 integration
                                <br />
                                Scalable dataviz components with full
                                integration
                                <br />
                                Downloadable PDF/epub/mobi
                                <br />
                                Money-back guarantee
                                <br />
                                Yours forever
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
                                <span class="curr">$</span>249
                            </div>
                        }
                        plan={
                            <div>
                                <p>
                                    <strong>FULL COURSE</strong>
                                </p>
                                <p>
                                    <strong>+ consultation</strong>
                                </p>
                            </div>
                        }
                        features={
                            <div>
                                <b>
                                    30min consultation where we discuss your
                                    usecase
                                </b>
                                <br />
                                A quick intro to D3
                                <br />
                                How React makes D3 easier
                                <br />
                                Quick React+D3 integration
                                <br />
                                Scalable dataviz components with full
                                integration
                                <br />
                                Detailed walkthrough of a large dataviz
                                dashboard project
                                <br />
                                Game loop animation
                                <br />
                                Animating with transitions
                                <br />
                                Enter/update/exit animation
                                <br />
                                Redux and MobX basics
                                <br />
                                Rendering to Canvas
                                <br />
                                Refactoring to React Hooks
                                <br />
                                Downloadable PDF/epub/mobi
                                <br />
                                Money-back guarantee
                                <br />
                                Yours forever
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
                        plan="FULL COURSE"
                        features={
                            <div>
                                A quick intro to D3
                                <br />
                                How React makes D3 easier
                                <br />
                                Quick React+D3 integration
                                <br />
                                Scalable dataviz components with full
                                integration
                                <br />
                                Detailed walkthrough of a large dataviz
                                dashboard project
                                <br />
                                Game loop animation
                                <br />
                                Animating with transitions
                                <br />
                                Enter/update/exit animation
                                <br />
                                Redux and MobX basics
                                <br />
                                Rendering to Canvas
                                <br />
                                Refactoring to React Hooks
                                <br />
                                Downloadable PDF/epub/mobi
                                <br />
                                Money-back guarantee
                                <br />
                                Yours forever
                            </div>
                        }
                        button={
                            <a href="/" class="btn btn-grey btn-min-width">
                                PRE-ORDER
                            </a>
                        }
                    />
                </WrapperBlock>
            </Wrapper>
        );
    }
}

export default Pricing;
