import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, sendLocation } from "../../redux/actions/mappingAction";
import styled from "styled-components";

const { kakao } = window;

const TrackingMap = () => {
  const [myMap, setMyMap] = useState(null);
  const [line, setLine] = useState([]);

  const dispatch = useDispatch();
  const { lat, lon } = useSelector((state) => state.mapping);

  function setGeolocation() {
    let geolocation = navigator.geolocation.watchPosition(
      function (position) {
        dispatch(
          getLocation(position.coords.latitude, position.coords.longitude)
        );
        // dispatch(
        //   sendLocation(position.coords.latitude, position.coords.longitude)
        // );
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

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const drawMap = async () => {
    let container = document.getElementById("myMap");
    let options = {
      center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
      level: 2 //지도의 레벨(확대, 축소 정도)
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
      strokeOpacity: 0.7,
      strokeStyle: "solid"
    });
    polyline.setMap(myMap);
  };

  useInterval(() => {
    setGeolocation();
    if (lat && lon) {
      setLine([...line, new kakao.maps.LatLng(lat, lon)]);
      drawLine();
    }
    console.log(lat, lon);
  }, 3000);

  useEffect(() => {
    setGeolocation();
    if (lat > 0 && lon > 0) {
      drawMap();
    }
  }, [lat, lon]);

  return (
    <MapBox>
      <div id="myMap" style={{ width: "250px", height: "300px" }}></div>
      <button
        onClick={() => {
          panTo();
        }}
      >
        현재위치이
      </button>
      <div>{lat}</div>
      <div>{lon}</div>
    </MapBox>
  );
};

const MapBox = styled.div`
  background-color: white;
  height: 100vh;
`;

const Map = styled.div`
  opacity: 0.8;
  ::before {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 390px;
    background: linear-gradient(to top, white, transparent);
    z-index: 2;
    content: "";
  }
`;

export default TrackingMap;
