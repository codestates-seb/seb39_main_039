import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocation,
  sendLocation,
  getWalkDetailInfo
} from "../../redux/actions/mappingAction";
import styled from "styled-components";
import { useInterval } from "../../hooks/useInterval";

import TimeCount from "../Time";
import InfoPanel from "../InfoPanel";
import { useNavigate } from "react-router-dom";

const { kakao } = window;

const TrackingMap = () => {
  const [myMap, setMyMap] = useState(null);
  const [line, setLine] = useState([]);
  const [isPauseWalk, setIsPauseWalk] = useState(false);
  const [lineForDistance, setLineForDistance] = useState([]);
  const [dis, setDis] = useState(0);
  const dispatch = useDispatch();
  const { lat, lon, walkDetailInfo, isWalk } = useSelector(
    (state) => state.mapping
  );
  const [mapImgUrl, setMapImgUrl] = useState("");
  const [mapImg, setMapImg] = useState(null);

  const mapImage = useRef();
  const distance = 10;

  const navigate = useNavigate();

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

  let container, options, container1, options1;

  const drawMap = async () => {
    options = {
      center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
      isPanto: true
    };
    container = document.getElementById("myMap");
    setMyMap(new kakao.maps.Map(container, options));
  };

  const makeMapImage = () => {
    options1 = {
      center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    container1 = document.getElementById("staticMap");

    setMapImg(new kakao.maps.Map(container1, options1));
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

  const drawLineImg = () => {
    let polyline = new kakao.maps.Polyline({
      map: mapImg,
      path: line,
      strokeWeight: 10,
      strokeColor: "#3183f8",
      strokeOpacity: 1,
      strokeStyle: "solid"
    });
    polyline.setMap(mapImg);
  };

  setTimeout(() => {
    myMap.panTo(new kakao.maps.LatLng(lat, lon));
  }, 3000);

  useInterval(() => {
    dispatch(getWalkDetailInfo(1));
    getGeolocation();
    if (lat && lon) {
      if (!isPauseWalk && isWalk) {
        setLine([...line, new kakao.maps.LatLng(lat, lon)]);
        drawLine();
      }
    }

    // drawLineImg();
    // setMapImgUrl(mapImage.current.style.background.slice(5, -2));
    // console.log(mapImg);
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
    if (!isPauseWalk && isWalk && dis >= 10) {
      dispatch(sendLocation(lat, lon, distance));
    }
  }, [lat, lon]);

  useEffect(() => {
    drawMap();
    // panTo();
  }, []);

  useEffect(() => {
    // if (lat > 0 && lon > 0) makeMapImage();
  }, [lat, lon]);

  return (
    <MapBox>
      {/* <div
        id="staticMap"
        style={{ width: "100%", height: "300px" }}
        ref={mapImage}
      ></div> */}
      {/* <Map
        id="staticMap"
        style={{ width: "100%", height: "300px" }}
        ref={mapImage}
      ></Map> */}
      <Map
        id="myMap"
        style={{ width: "100%", height: "300px" }}
        // ref={mapImage}
      ></Map>

      <div className="control-area">
        <TimeCount setIsPauseWalk={setIsPauseWalk} isPauseWalk={isPauseWalk} />
        <ResultInfo>
          <InfoPanel number={walkDetailInfo.distance} string={"산책 거리"} />
          <InfoPanel number={`${10}`} string={"속도(분/km)"} />
        </ResultInfo>
      </div>
    </MapBox>
  );
};

const MapBox = styled.div`
  position: relative;
  background-color: white;
  /* height: 100vh; */
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

export default TrackingMap;
