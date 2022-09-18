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
import Time from "../Time";
import InfoPanel from "../InfoPanel";

const { kakao } = window;

const TrackingMap = () => {
  const [myMap, setMyMap] = useState(null);
  const [line, setLine] = useState([]);
  const [isPauseWalk, setIsPauseWalk] = useState(false);
  const [lineForDistance, setLineForDistance] = useState([]);
  const [dis, setDis] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lat, lon, walkDetailInfo, isWalk } = useSelector(
    (state) => state.mapping
  );
  const distance = 20;

  function getGeolocation() {
    let geolocation = navigator.geolocation.watchPosition(
      function (position) {
        dispatch(
          getLocation(position.coords.latitude, position.coords.longitude)
        );
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

  let container, options, moveLatLon, dist;

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
    getGeolocation();
    if (lat && lon) {
      if (!isPauseWalk && isWalk) {
        setLine([...line, new kakao.maps.LatLng(lat, lon)]);
        drawLine();
      }
    }
  }, 5000);

  function getDistance(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 === lon2) return 0;

    let radLat1 = (Math.PI * lat1) / 180;
    let radLat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radTheta = (Math.PI * theta) / 180;
    dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;
  }

  useEffect(() => {
    setLineForDistance([...lineForDistance, [lat, lon]]);

    if (lineForDistance.length > 1) {
      setLineForDistance([lineForDistance[1], [lat, lon]]);
      getDistance(
        lineForDistance[0][0],
        lineForDistance[0][1],
        lineForDistance[1][0],
        lineForDistance[1][1]
      );
    }
    if (!isPauseWalk && isWalk && dis > 10) {
      dispatch(sendLocation(lat, lon, distance));
    }
    setDis(dist);
  }, [lat, lon]);

  useEffect(() => {
    drawMap();
  }, []);

  useEffect(() => {
    if (lat > 0 && lon > 0) {
      panTo();
    }
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

      <div>
        <Time />
        <InfoPanel number={`${10} m`} string={"산책 거리"} />
      </div>
    </MapBox>
  );
};

const MapBox = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 500ms;
  > div:nth-child(3) {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    > div:first-child {
    }
    > div:nth-child(2) {
      > div > span {
        letter-spacing: 10px;
      }
    }
  }
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
  transition: 500ms;
  > div {
    margin: 15px;
  }
  position: absolute;
  top: 280px;
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

export default TrackingMap;
