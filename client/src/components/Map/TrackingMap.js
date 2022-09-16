import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocation,
  sendLocation,
  getWalkDetailInfo
} from "../../redux/actions/mappingAction";
import styled from "styled-components";
import { useInterval } from "../../hooks/useInterval";
import { walkState } from "../../redux/actions/mappingAction";
import { useNavigate } from "react-router-dom";
import startWalking from "../../assets/img/startWalking.svg";
import pauseWalking from "../../assets/img/pauseWalking.svg";
import stopWalking from "../../assets/img/stopWalking.svg";
import restartWalking from "../../assets/img/restartWalking.svg";
import takeAPicture from "../../assets/img/takeAPicture.svg";

const { kakao } = window;

const TrackingMap = () => {
  const [myMap, setMyMap] = useState(null);
  const [line, setLine] = useState([]);
  const [isPauseWalk, setIsPauseWalk] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lat, lon, walkDetailInfo, isWalk } = useSelector(
    (state) => state.mapping
  );
  const distance = 20;
  function setGeolocation() {
    let geolocation = navigator.geolocation.watchPosition(
      function (position) {
        dispatch(
          getLocation(position.coords.latitude, position.coords.longitude)
        );

        if (!isPauseWalk && isWalk) {
          dispatch(
            sendLocation(
              position.coords.latitude,
              position.coords.longitude,
              distance
            )
          );
        }
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0
      }
    );
  }

  console.log(isWalk, lat, lon);

  let container, options, moveLatLon;

  const drawMap = async () => {
    options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    container = document.getElementById("myMap");

    setMyMap(new kakao.maps.Map(container, options));
  };

  const panTo = () => {
    moveLatLon = new kakao.maps.LatLng(lat, lon);
    myMap.panTo(moveLatLon);
  };

  const drawLine = () => {
    let polyline = new kakao.maps.Polyline({
      map: myMap,
      path: line,
      strokeWeight: 10,
      strokeColor: "#3183f8",
      strokeOpacity: 1,
      strokeStyle: "solid"
    });
    polyline.setMap(myMap);
  };

  useInterval(() => {
    setGeolocation();
    if (lat && lon) {
      if (!isPauseWalk && isWalk) {
        setLine([...line, new kakao.maps.LatLng(lat, lon)]);
        drawLine();
      }
    }
  }, 1000);

  console.log(isPauseWalk);

  useEffect(() => {
    drawMap();
  }, []);

  useEffect(() => {
    if (lat > 0 && lon > 0) panTo();
  }, [lat, lon]);

  return (
    <MapBox>
      <Map id="myMap" style={{ width: "385px", height: "300px" }}></Map>
      <FunctionBtn>
        {!isWalk ? (
          <StartWalkingPet
            onClick={() => {
              dispatch(walkState(true));
            }}
          ></StartWalkingPet>
        ) : (
          <>
            {isPauseWalk ? (
              <RestartWalkingPet
                onClick={() => {
                  setIsPauseWalk(!isPauseWalk);
                }}
              ></RestartWalkingPet>
            ) : (
              <PauseWalkingPet
                onClick={() => {
                  setIsPauseWalk(!isPauseWalk);
                }}
              ></PauseWalkingPet>
            )}
            <StopWalkingPet
              onClick={() => {
                dispatch(walkState(false));
              }}
            ></StopWalkingPet>
            <TakePicturePet></TakePicturePet>
          </>
        )}
      </FunctionBtn>
    </MapBox>
  );
};

const MapBox = styled.div`
  background-color: white;
  height: 100vh;
  transition: 500ms;
`;

const Map = styled.div`
  opacity: 0.6;
  border-radius: 10px;
  ::before {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, white, transparent);
    z-index: 2;
    content: "";
  }
`;

const FunctionBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    margin: 15px;
  }
`;

const StartWalkingPet = styled.div`
  width: 83px;
  height: 83px;
  background-image: url("${startWalking}");
  cursor: pointer;
`;

const StopWalkingPet = styled.div`
  width: 83px;
  height: 83px;
  background-image: url("${stopWalking}");
  cursor: pointer;
`;

const RestartWalkingPet = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("${restartWalking}");
  cursor: pointer;
`;

const PauseWalkingPet = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("${pauseWalking}");
  cursor: pointer;
`;

const TakePicturePet = styled.div`
  width: 60px;
  height: 60px;
  background-image: url("${takeAPicture}");
  cursor: pointer;
`;

export default TrackingMap;
