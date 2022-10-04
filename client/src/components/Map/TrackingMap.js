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
  const [lastSentLocation, setLastSendedLoaction] = useState({ lat : null, lon :null });
  const [lastLocation, setLastLocation] = useState({ lat : null, lon : null })
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
        //새로 받아온 좌표로 그림 그리기
        setLine([...line, new kakao.maps.LatLng(lat, lon)]);
        drawLine();

        //새로 받아온 좌표와 이전 좌표를 비교해서 거리와 속력 구하기
        //이전 좌표가 없을때(막 시작했을 때)
        if(lastLocation.lat ===null){
          setLastLocation({
            lat: lat,
            lon: lon
          })
        }
        //이전 좌표가 있을때
        else {
          //이전 좌표와 현재 좌표의 거리를 구함
          let distanceFromLastLocation = getDistance(lastLocation.lat, lastLocation.lon, lat, lon);
          //가끔 에러가 나는데 왜그러는지 모르겠어서 일단 거리가 너무 한번에 멀어지는 경우도 방지. 너무 가까우면 굳이 안하고
          if (distanceFromLastLocation >= 1 && distanceFromLastLocation < 100) {
            setInfoDistance(distanceFromLastLocation + infoDistance);
            //속도는 이전 좌표와 현재 좌표의 거리를 2초로 나눈것(2초 인터벌이므로)
            setSpeed(Math.round(distanceFromLastLocation / 2));
          } else setSpeed(0);
          //현재 좌표를 이전좌표로 넣어줌
          setLastLocation({
            lat:lat,
            lon:lon
          })
        }

        //서버로 이전에 보낸 위치에서 10미터 이상일때 좌표 보내기.
        if((lastSentLocation.lat ===null) && (lat !== null) && (lon !== null)){
          //제일 초기 위치 보내기. 초기 위치를 마지막 보낸 위치로 저장
          dispatch(sendLocation(lat, lon, dis, id));
          setLastSendedLoaction({
            lat : lat,
            lon : lon
          })
        }
        //직전 서버로 보낸 위치와 현재 위치의 거리를 비교.
        let distanceFromLastSentLocation = getDistance(lastSentLocation.lat, lastSentLocation.lon, lat, lon);

        //위의 distance가 10보다 크면 서버로 전송하고, 이전 보낸 좌표를 업데이트
        if (distanceFromLastSentLocation >= 10 && distanceFromLastSentLocation < 1000) {
          dispatch(sendLocation(lat, lon, distanceFromLastSentLocation, id));
          setLastSendedLoaction({
            lat : lat,
            lon : lon
          })
        }

      }
    }
  }, 2000);

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
    if (dist < 100) dist = Math.round(dist);
    else dist = Math.round(dist / 100) * 100;

    return dist;
  }

  // console.log(speedForMinutes, speedForHours, infoDistance);

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
