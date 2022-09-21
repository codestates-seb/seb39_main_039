import React, { useRef } from "react";
import { useStopwatch } from "react-timer-hook";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { walkState } from "../redux/actions/mappingAction";
import startWalking from "../assets/img/startWalking.svg";
import pauseWalking from "../assets/img/pauseWalking.svg";
import stopWalking from "../assets/img/stopWalking.svg";
import restartWalking from "../assets/img/restartWalking.svg";
import takeAPicture from "../assets/img/takeAPicture.svg";
import { useDispatch, useSelector } from "react-redux";

const TimeCount = ({ setIsPauseWalk, isPauseWalk }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seconds, minutes, hours, start, pause } = useStopwatch({
    autoStart: false
  });
  const { isWalk } = useSelector((state) => state.mapping);
  const timer = useRef();

  return (
    <>
      <FunctionBtn>
        {!isWalk ? (
          <StartWalkingPet
            onClick={() => {
              dispatch(walkState(true));
              start();
            }}
          ></StartWalkingPet>
        ) : (
          <>
            {isPauseWalk ? (
              <RestartWalkingPet
                onClick={() => {
                  setIsPauseWalk(!isPauseWalk);
                  start();
                }}
              ></RestartWalkingPet>
            ) : (
              <PauseWalkingPet
                onClick={() => {
                  setIsPauseWalk(!isPauseWalk);
                  pause();
                }}
              ></PauseWalkingPet>
            )}
            <StopWalkingPet
              onClick={() => {
                dispatch(walkState(false));
                navigate("/walkerMain");
              }}
            ></StopWalkingPet>
            <TakePicturePet></TakePicturePet>
          </>
        )}
      </FunctionBtn>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "100px" }} ref={timer}>
          <span>{hours}</span>:
          {minutes < 10 ? <span>0{minutes}</span> : <span>{minutes}</span>}:
          {seconds < 10 ? <span>0{seconds}</span> : <span>{seconds}</span>}
        </div>
      </div>
    </>
  );
};

const FunctionBtn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 500ms;
  > div {
    margin: 15px;
  }
  margin-top: -30px;
`;

const StartWalkingPet = styled.div`
  width: 83px;
  height: 83px;
  background-image: url("${startWalking}");
  cursor: pointer;
  transition: 500ms 20ms;

  :hover {
    transform: scale(1.04);
  }
`;

const StopWalkingPet = styled.div`
  width: 83px;
  height: 83px;
  background-image: url("${stopWalking}");
  cursor: pointer;
  transition: 500ms 20ms;
  :hover {
    transform: scale(1.04);
  }
`;

const RestartWalkingPet = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("${restartWalking}");
  cursor: pointer;
  transition: 500ms 20ms;
  :hover {
    transform: scale(1.04);
  }
`;

const PauseWalkingPet = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("${pauseWalking}");
  cursor: pointer;
  transition: 500ms 20ms;
  :hover {
    transform: scale(1.04);
  }
`;

const TakePicturePet = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("${takeAPicture}");
  cursor: pointer;
  transition: 500ms 20ms;
  :hover {
    transform: scale(1.04);
  }
`;

export default TimeCount;
