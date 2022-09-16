import React from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import styled from "styled-components";

const Time = () => {
  return (
    <CountTime>
      <Timer active duration={null}>
        <Timecode format={"H:?mm:ss"} />
      </Timer>
    </CountTime>
  );
};

const CountTime = styled.div`
  font-size: 60px;
`;

export default Time;
