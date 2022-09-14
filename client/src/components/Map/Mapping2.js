import React, { useEffect, useState, useRef } from "react";

const { kakao } = window;

const Mapping2 = () => {
  // const [lat, setLat] = useState(37.4361727123);
  // const [lon, setLon] = useState(127.141231424);
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
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
      level: 6 //지도의 레벨(확대, 축소 정도)
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
    <>
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
    </>
  );
};

export default Mapping2;
