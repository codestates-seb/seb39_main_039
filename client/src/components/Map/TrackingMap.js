import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocation,
  sendLocation,
  getWalkDetailInfo
} from "../../redux/actions/mappingAction";
import styled from "styled-components";
import { useInterval } from "../../hooks/useInterval";
import { Header } from "../Layout/Header";

const { kakao } = window;

const TrackingMap = () => {
  const [myMap, setMyMap] = useState(null);
  const [line, setLine] = useState([]);
  const [isPauseWalk, setIsPauseWalk] = useState(false);

  const dispatch = useDispatch();
  const { lat, lon, walkDetailInfo } = useSelector((state) => state.mapping);

  function setGeolocation() {
    let geolocation = navigator.geolocation.watchPosition(
      function (position) {
        dispatch(
          getLocation(position.coords.latitude, position.coords.longitude)
        );
        if (!isPauseWalk) {
          dispatch(
            sendLocation(position.coords.latitude, position.coords.longitude)
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

  const drawMap = async () => {
    let container = document.getElementById("myMap");
    let options = {
      center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    setMyMap(new kakao.maps.Map(container, options));
  };

  const panTo = async () => {
    let moveLatLon = new kakao.maps.LatLng(lat, lon);
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
      if (!isPauseWalk) {
        setLine([...line, new kakao.maps.LatLng(lat, lon)]);
        drawLine();
      }
    }
  }, 3000);

  console.log(isPauseWalk);

  useEffect(() => {
    setGeolocation();
    dispatch(getWalkDetailInfo(1));

    if (lat > 0 && lon > 0) {
      if (!isPauseWalk) {
        drawMap();
      }
    }
  }, [lat, lon]);

  return (
    <MapBox>
      <Header />
      <div>{walkDetailInfo.walkId}번 산책알뱌</div>
      <Map id="myMap" style={{ width: "375px", height: "300px" }}></Map>
      <button
        onClick={() => {
          panTo();
        }}
      >
        현재위치로
      </button>
      {isPauseWalk ? (
        <button
          onClick={() => {
            setIsPauseWalk(!isPauseWalk);
          }}
        >
          산책 재개
        </button>
      ) : (
        <button
          onClick={() => {
            setIsPauseWalk(!isPauseWalk);
          }}
        >
          산책 일시정지
        </button>
      )}
    </MapBox>
  );
};

const MapBox = styled.div`
  background-color: white;
  height: 100vh;
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
