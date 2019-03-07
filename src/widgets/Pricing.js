import React, { useEffect } from "react";
import styled from "styled-components";
import PriceBox from "../widgets/PriceBox.js";
import PriceBoxSpecial from "../widgets/PriceBoxSpecial.js";
import FadeIn from "react-lazyload-fadein";

const Wrapper = styled.div`
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

const BigBuyButton = ({ id, price, onload }) => {
    useEffect(() => onload(), []);
    return (
        <a
            href={`https://gumroad.com/l/${id}`}
            className=" btn btn-grey btn-min-width"
            data-gumroad-product-id={id}
            data-gumroad-single-product="true"
        >
            Buy now ${price}
        </a>
    );
};

export const FadeInButton = ({ id, price }) => {
    // let offer = price * context.offer.value,
    //     strike = offer === price ? "" : <strike>${price}</strike>;

    return (
        // <a
        //     href={`https://gumroad.com/l/${id}?wanted=true`}
        //     data-gumroad-single-product="true"
        //     data-gumroad-produc-id={id}
        //     className="btn btn-grey btn-min-width gumroad-product-embed"
        // >
        //     Buy now for ${price}
        // </a>
        <FadeIn height={55} duration={150}>
            {onload => <BigBuyButton id={id} price={price} onload={onload} />}
        </FadeIn>
    );
};

const Pricing = () => (
    <Wrapper>
        <WrapperBlock>
            <PriceBox
                price={
                    <>
                        <span className="curr">$</span>49
                    </>
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
                        Scalable dataviz components with full integration
                        <br />
                        Downloadable PDF/epub/mobi
                        <br />
                        <b>3 extra projects you can use as a cookbook</b>
                        <br />
                        <br />
                        Money-back guarantee
                        <br />
                        Yours forever
                    </div>
                }
                button={<FadeInButton id="Fqwwi" price={49} />}
            />
            <PriceBoxSpecial
                price={
                    <>
                        <span className="curr">$</span>249
                    </>
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
                        <b>30min consultation where we discuss your usecase</b>
                        <br />
                        A quick intro to D3
                        <br />
                        How React makes D3 easier
                        <br />
                        Quick React+D3 integration
                        <br />
                        Scalable dataviz components with full integration
                        <br />
                        Detailed walkthrough of a large dataviz dashboard
                        project
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
                        <b>14 extra projects you can use as a cookbook</b>
                        <br />
                        <br />
                        Money-back guarantee
                        <br />
                        Yours forever
                    </div>
                }
                button={<FadeInButton id="Hnbtz" price={249} />}
            />
            <PriceBox
                price={
                    <>
                        <span className="curr">$</span>149
                    </>
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
                        Scalable dataviz components with full integration
                        <br />
                        Detailed walkthrough of a large dataviz dashboard
                        project
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
                        <b>14 extra projects you can use as a cookbook</b>
                        <br />
                        <br />
                        Money-back guarantee
                        <br />
                        Yours forever
                    </div>
                }
                button={<FadeInButton id="KDLxE" price={149} />}
            />
        </WrapperBlock>
    </Wrapper>
);

export default Pricing;
