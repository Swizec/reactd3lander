import React from "react";
import styled from "styled-components";

import { LazyImage } from "../widgets/Image";

const Wrapper = styled.div`
    margin: 7rem 0;

    img {
        max-width: 500px;
    }
`;

const Examples = ({ image, header, copy }) => (
    <Wrapper>
        <LazyImage height={567} src={image} />
        <h4>{header}</h4>
        <p>{copy}</p>
    </Wrapper>
);

export default Examples;
