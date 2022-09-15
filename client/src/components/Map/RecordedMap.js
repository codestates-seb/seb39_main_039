import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocation,
  getWalkDetailInfo
} from "../../redux/actions/mappingAction";
import styled from "styled-components";
import { Header } from "../Layout/Header";

const { kakao } = window;

const TrackingMap = () => {
  const [myMap, setMyMap] = useState(null);
  const [recordedLine, setRecordedLine] = useState([]);

  const dispatch = useDispatch();
  const { lat, lon, walkDetailInfo } = useSelector((state) => state.mapping);

  function setGeolocation() {
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

  const drawLine = async () => {
    let polyline = new kakao.maps.Polyline({
      map: myMap,
      path: recordedLine,
      strokeWeight: 10,
      strokeColor: "#3183f8",
      strokeOpacity: 1,
      strokeStyle: "solid"
    });
    polyline.setMap(myMap);
  };

  const makeRecordObj = () => {
    const recordObj = walkDetailInfo.coord?.map((el) => {
      return new kakao.maps.LatLng(...el?.split(" "));
    });
    setRecordedLine(recordObj);
  };

  setTimeout(() => {}, 3000);

  useEffect(() => {
    if (lat > 0 && lon > 0) {
      drawLine();
    }
  }, [recordedLine]);

  useEffect(() => {
    setGeolocation();
    dispatch(getWalkDetailInfo(1));
    makeRecordObj();

    if (lat > 0 && lon > 0) {
      drawMap();
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
