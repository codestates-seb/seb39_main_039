import React, { useEffect, useState, useRef } from "react";

const { kakao } = window;

const Mapping2 = () => {
  const [lat, setLat] = useState(37.4362952);
  const [lon, setLon] = useState(127.1400258);
  const [myMap, setMyMap] = useState(null);
  const [line, setLine] = useState([]);

  function setGeolocation() {
    let geolocation = navigator.geolocation.watchPosition(
      function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
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

  useInterval(() => {
    setGeolocation();
    setLine([...line, new kakao.maps.LatLng(lat, lon)]);
    drawLine();
    console.log(lat, lon);
  }, 1000);

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
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

  const drawMap = () => {
    let container = document.getElementById("myMap");
    let options = {
      center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
      level: 6 //지도의 레벨(확대, 축소 정도)
    };
    setMyMap(new kakao.maps.Map(container, options));
  };

  const drawLine = () => {
    let polyline = new kakao.maps.Polyline({
      map: myMap,
      path: line,
      strokeWeight: 5,
      strokeColor: "#FF00FF",
      strokeOpacity: 0.8,
      strokeStyle: "solid"
    });
    polyline.setMap(myMap);
  };

  useEffect(() => {
    drawMap();
  }, []);

  return (
    <>
      <div id="myMap" style={{ width: "400px", height: "400px" }}></div>
      <div>{lat}</div>
      <div>{lon}</div>
    </>
  );
};

export default Mapping2;
