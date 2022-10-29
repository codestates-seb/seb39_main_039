import { useEffect, useState } from "react";
import styled from "styled-components";
import InfoPanel from "../components/InfoPanel";
import { useInterval } from "../hooks/useInterval";

const WalkResultInfo = ({
  walkDetailInfo,
  speed,
  setSpeedForHours,
  setSpeedForMinutes,
  setSpeedForSeconds,
  distance,
}) => {
  return (
    <ResultInfo>
      <InfoPanel number={distance} string={"산책 거리"} />
      <InfoPanel number={speed} string={"속도(m/s)"} />
    </ResultInfo>
  );
};

export default WalkResultInfo;

const ResultInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0 0;

  > div {
    flex: 1;
    text-align: center;
  }
`;
