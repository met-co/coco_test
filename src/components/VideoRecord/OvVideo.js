import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const OpenViduVideoComponent = (props) => {
  const videoRef = useRef();

  useEffect(() => {
    if (props.streamManager && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }
    return () => {};
  }, [props.streamManager, videoRef]);

  return (
    <StContainer>
      <video
        autoPlay={true}
        ref={videoRef}
        style={{ width: "170px", borderRadius: "20px" }}
      ></video>
      <StNickname>
        {props.streamManager.stream.connection.data.split("%")[2]}
      </StNickname>
    </StContainer>
  );
};

export default OpenViduVideoComponent;

const StContainer = styled.div`
  width: 160px;
  height: 120px;
`;

const StNickname = styled.div`
  height: 40px;
  margin-top: 5px;
  background-color: white;
  border: 1px solid #a0a0a0;
  border-radius: 15px;
  display: inline-block;
  padding: 10px;
  box-sizing: border-box;
`;
