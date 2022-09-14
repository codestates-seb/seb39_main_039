import React, { useState } from "react";
import Mapping2 from "../../../components/Map/Mapping2";

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
      {isWalk ? <Mapping2 /> : <></>}
    </div>
  );
};

export default Map;
