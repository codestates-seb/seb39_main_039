import React, { useEffect, useState, useMemo, componentDidMount } from "react";
import { useDispatch } from "react-redux";
import { getLocation } from "../redux/actions/mappingAction";
import { useSelector } from "react-redux";
import dog from "../puppy.png";

const { kakao } = window;
function Mapping() {
  const dispatch = useDispatch();
  const [firstLat, setFirstLat] = useState(37.4362952);
  const [firstLon, setFirstLon] = useState(127.1400258);
  const [date, setDate] = useState("");
  const [drawLine, setDrawLine] = useState([]);
  const [myMap, setMyMap] = useState();
  // const { lat, lon } = useSelector((state) => state.mapping);
  // setDate(new Date());
  let sohee = new Date().getSeconds();

  let container, options, lat, lon;

  // function getMyLocation() {
  //   if (navigator.geolocation) {
  //     let id = navigator.geolocation.watchPosition(
  //       (position) => {
  //         let lat = position.coords.latitude;
  //         let lon = position.coords.longitude;
  //         setFirstLat(position.coords.latitude);
  //         setFirstLon(position.coords.longitude);
  //         console.log(firstLat, firstLon);
  //         return dispatch(getLocation(firstLat, firstLon));
  //       },
  //       (err) => {
  //         console.log(err.message);
  //       },
  //       {
  //         enableHighAccuracy: true,
  //         maximumAge: 0,
  //         timeout: 5000
  //       }
  //     );
  //   }
  // }

  // const makeMap = async () => {
  //   if (navigator.geolocation) {
  //     const newId = navigator.geolocation.watchPosition(
  //       (position) => {
  //         // setFirstLat(position.coords.latitude);
  //         // setFirstLon(position.coords.longitude);
  //         lat = position.coords.latitude;
  //         lon = position.coords.longitude;
  //         console.log(position);
  //         container = document.getElementById("myMap");
  //         options = {
  //           center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
  //           level: 6 //지도의 레벨(확대, 축소 정도)
  //         };
  //         myMap = new kakao.maps.Map(container, options);
  //       },
  //       (err) => {
  //         console.log(err.message);
  //       },
  //       { enableHighAccuracy: false, maximumAge: 0, timeout: Infinity }
  //     );
  //   }
  // };

  // let newId = navigator.geolocation.watchPosition(changed);

  // function changed(position) {
  //   lat = position.coords.latitude;
  //   lon = position.coords.longitude;
  // }
  // makeMap();

  // useEffect(() => {}, []);

  // let count, watchID, myMap, lat, lon;

  // function findLocation() {
  //   if (navigator.geolocation) {
  //     let options = {
  //       enableHighAccuracy: true,
  //       timeout: Infinity,
  //       maximumAge: 0
  //     };
  //     navigator.geolocation.watchPosition(showYourLocation, null, options);
  //   }
  //   function showYourLocation(position) {
  //     lat = position.coords.latitude; // 변경된 위도
  //     lon = position.coords.longitude; // 변경된 경도
  //     console.log(lat, lon);
  //     container = document.getElementById("myMap");
  //     options = {
  //       center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
  //       level: 6 //지도의 레벨(확대, 축소 정도)
  //     };
  //     myMap = new kakao.maps.Map(container, options);
  //   }
  // }

  // findLocation();

  function setGeolocation() {
    let geolocation = window.navigator.geolocation.watchPosition(
      function (position) {
        lat = position.coords.latitude; // 변경된 위도
        lon = position.coords.longitude; // 변경된 경도
        // setFirstLat(position.coords.latitude);
        // setFirstLon(position.coords.longitude);
      },
      function () {
        /*error*/
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 2000
      }
    );
  }

  window.setInterval(function () {
    setGeolocation();
    setDrawLine([...drawLine, new kakao.maps.LatLng(firstLat, firstLon)]);
    let polyline = new kakao.maps.Polyline({
      map: myMap,
      path: drawLine, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 5, // 선의 두께 입니다
      strokeColor: "red", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid" // 선의 스타일입니다
    });

    // let locPosition = new kakao.maps.LatLng(firstLat, firstLon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

    // var imageSrc = `${dog}`, // 마커이미지의 주소입니다
    //   imageSize = new kakao.maps.Size(45, 40), // 마커이미지의 크기입니다
    //   imageOption = { offset: new kakao.maps.Point(0, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    // var markerImage = new kakao.maps.MarkerImage(
    //     imageSrc,
    //     imageSize,
    //     imageOption
    //   ),
    //   markerPosition = new kakao.maps.LatLng(firstLat, firstLon); // 마커가 표시될 위치입니다

    // function displayMarker(locPosition) {
    //   // 마커를 생성합니다
    //   let marker = new kakao.maps.Marker({
    //     map: myMap,
    //     position: markerPosition,
    //     image: markerImage
    //   });
    // }

    // displayMarker(locPosition);

    polyline.setMap(myMap);
  }, 1000);

  useEffect(() => {
    container = document.getElementById("myMap");
    options = {
      center: new kakao.maps.LatLng(firstLat, firstLon), //지도의 중심좌표.
      level: 6 //지도의 레벨(확대, 축소 정도)
    };
    setMyMap(new kakao.maps.Map(container, options));
  }, [container]);

  //37.4362952, 127.1400258

  return (
    <div>
      <div
        id="myMap"
        className="map"
        style={{ width: "400px", height: "400px" }}
      ></div>
      <button
        onClick={() => {
          // setLinePath([...linePath, new kakao.maps.LatLng(lat, lon)]);
        }}
      >
        그리기
      </button>
    </div>
  );
}

export default Mapping;
