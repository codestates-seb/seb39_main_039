import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, sendLocation } from "../../redux/actions/mappingAction";
import styled from "styled-components";
import { useInterval } from "../../hooks/useInterval";
import TimeCount from "../Time";
import { useParams } from "react-router-dom";
import WalkResultInfo from "../WalkResultInfo";

const { kakao } = window;

const TrackingMap = () => {
  const [myMap, setMyMap] = useState(null);
  const [line, setLine] = useState([]);
  const [isPauseWalk, setIsPauseWalk] = useState(false);
  const [lineForDistance, setLineForDistance] = useState([]);
  const [dis, setDis] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [infoDistance, setInfoDistance] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [speedForHours, setSpeedForHours] = useState(0);
  const [speedForMinutes, setSpeedForMinutes] = useState(0);
  const [speedForSeconds, setSpeedForSeconds] = useState(1);
  const [infoDis, setInfoDis] = useState(0);
  const dispatch = useDispatch();
  const { lat, lon, walkDetailInfo, isWalk } = useSelector(
    (state) => state.mapping
  );

  const { id } = useParams();
  const localLat = localStorage.getItem("lat");
  const localLon = localStorage.getItem("lon");

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
        maximumAge: 0,
      }
    );
  }

  let container, options;

  const drawMap = async () => {
    options = {
      center: new kakao.maps.LatLng(localLat, localLon), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
      isPanto: true,
    };
    container = document.getElementById("myMap");
    setMyMap(new kakao.maps.Map(container, options));
  };

  const drawLine = () => {
    let polyline = new kakao.maps.Polyline({
      map: myMap,
      path: line,
      strokeWeight: 10,
      strokeColor: "#3183f8",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });
    polyline.setMap(myMap);
  };

  setTimeout(() => {
    myMap.panTo(new kakao.maps.LatLng(localLat, localLon));
  }, 3000);

  useInterval(() => {
    getGeolocation();
    if (localLat && localLon) {
      if (!isPauseWalk && isWalk) {
        setLine([...line, new kakao.maps.LatLng(lat, lon)]);
        drawLine();
      }
    }
  }, 1000);

  function getDistance(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 === lon2) return 0;

    let radLat1 = (Math.PI * lat1) / 180;
    let radLat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radTheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    setDis(dist);
    setInfoDis(dist);
  }

  // useInterval(() => {
  //   setSpeedForHours(hours * 3600);
  //   if (minutes > 0) {
  //     setSpeedForMinutes(minutes * 60);
  //   }
  //   if (infoDis < 1000)
  //     setSpeed(
  //       // (dis === 0 ? 1 : dis) /
  //       (infoDis / (speedForHours + speedForMinutes + speedForSeconds)).toFixed(
  //         1
  //       )
  //     );
  //   if (infoDis < 1000) {
  //     setInfoDistance(infoDistance + infoDis);
  //   }
  // }, 3000);

  useEffect(() => {
    setSpeedForHours(hours * 3600);
    if (minutes > 0) {
      setSpeedForMinutes(minutes * 60);
    }
    if (infoDis < 1000)
      setSpeed(
        // (dis === 0 ? 1 : dis) /
        (infoDis / (speedForHours + speedForMinutes + speedForSeconds)).toFixed(
          1
        )
      );
    if (infoDis < 1000) {
      setInfoDistance(infoDistance + infoDis);
    }
  }, [infoDis]);

  console.log(speedForMinutes, speedForHours, infoDistance, infoDis, dis);

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
    if (!isPauseWalk && isWalk && dis >= 10 && dis < 1000) {
      dispatch(sendLocation(lat, lon, dis, id));
    }
  }, [lat, lon]);

  useEffect(() => {
    drawMap();
  }, []);

  // console.log(lat, lon, speed, dis, lineForDistance, hours, minutes, seconds);
  return (
    <MapBox>
      <Map id="myMap" style={{ width: "100%", height: "300px" }}></Map>
      <div className="control-area">
        <TimeCount
          setIsPauseWalk={setIsPauseWalk}
          isPauseWalk={isPauseWalk}
          setHours={setHours}
          setMinutes={setMinutes}
          setSeconds={setSeconds}
        />
        <WalkResultInfo
          walkDetailInfo={walkDetailInfo}
          speed={speed}
          setSpeedForHours={setSpeedForHours}
          setSpeedForMinutes={setSpeedForMinutes}
          setSpeedForSeconds={setSpeedForSeconds}
          distance={infoDistance}
        />
      </div>
    </MapBox>
  );
};

const MapBox = styled.div`
  position: relative;
  background-color: white;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 500ms;
  > div:nth-child(3) {
    width: 100%;
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

  .control-area {
    width: 100%;
  }
`;

const Map = styled.div`
  opacity: 0.6;
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

export default TrackingMap;
