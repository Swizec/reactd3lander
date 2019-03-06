import React from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import FadeIn from "react-lazyload-fadein";

const VideoBlock = ({ videoId }) => (
    <FadeIn height={360} duration={300}>
        {onload => (
            <YouTube
                videoId={videoId}
                onReady={onload}
                containerClassName="centered"
            />
        )}
    </FadeIn>
);

export default VideoBlock;
