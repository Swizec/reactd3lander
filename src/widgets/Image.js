import React from "react";
import Img from "gatsby-image";
import FadeIn from "react-lazyload-fadein";
import { CenterDiv } from "../styles";

const NonStretchedImage = props => {
    let normalizedProps = props;

    if (props.fluid && props.fluid.presentationWidth) {
        normalizedProps = {
            ...props,
            style: {
                ...(props.style || {}),
                maxWidth: props.fluid.presentationWidth,
                margin: "0 auto"
            }
        };
    }

    return <Img {...normalizedProps} />;
};

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
export const LazyImage = ({ height, src }) => (
    <CenterDiv>
        <FadeIn height={height} duration={300}>
            {onload => <img src={src} alt="" onLoad={onload} />}
        </FadeIn>
    </CenterDiv>
);

export default NonStretchedImage;
