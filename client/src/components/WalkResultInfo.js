import { useEffect, useState } from "react";
import styled from "styled-components";
import InfoPanel from "../components/InfoPanel";
import { useInterval } from "../hooks/useInterval";

const WalkResultInfo = ({
  walkDetailInfo,
  distance,
  lat,
  lon,
  hours,
  minutes
}) => {
  const [infoDistance, setInfoDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [speedForHours, setSpeedForHours] = useState(0);
  const [speedForMinutes, setSpeedForMinutes] = useState(1);
  useEffect(() => {
    if (distance < 1000) {
      setInfoDistance(infoDistance + distance);
    }
  }, [lat, lon]);

  useInterval(() => {
    setSpeedForHours(hours * 60);
    setSpeedForMinutes(minutes);
    if (distance < 1000)
      setSpeed(
        (distance === 0
          ? 1
          : distance / (speedForMinutes + speedForHours)
        ).toFixed(1)
      );
  }, 3000);

  return (
    <ResultInfo>
      <InfoPanel number={infoDistance} string={"산책 거리"} />
      <InfoPanel number={speed} string={"속도(분/km)"} />
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
