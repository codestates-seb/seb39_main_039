import React, { useState } from "react";
import TrackingMap from "../../../components/Map/TrackingMap";

const Map = () => {
  const [isWalk, setIsWalk] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsWalk(true);
        }}
      >
        산책 시쟉
      </button>

      <button
        onClick={() => {
          setIsWalk(false);
        }}
      >
        산책 중지
      </button>
      {isWalk ? <TrackingMap /> : <></>}
    </div>
  );
};

export default Map;
