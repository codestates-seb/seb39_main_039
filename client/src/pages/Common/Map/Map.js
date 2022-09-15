import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TrackingMap from "../../../components/Map/TrackingMap";
import { walkState } from "../../../redux/actions/mappingAction";

const Map = () => {
  const dispatch = useDispatch();
  const { loading, isWalk } = useSelector((state) => state.mapping);

  if (isWalk) {
    return (
      <div>
        <button
          onClick={() => {
            dispatch(walkState(true));
          }}
        >
          산책 시쟉
        </button>

        <button
          onClick={() => {
            dispatch(walkState(false));
          }}
        >
          산책 중지
        </button>
        <TrackingMap />
      </div>
    );
  } else {
    return (
      <div>
        <button
          onClick={() => {
            dispatch(walkState(true));
          }}
        >
          산책 시쟉
        </button>

        <button
          onClick={() => {
            dispatch(walkState(false));
          }}
        >
          산책 중지
        </button>
        <div>메롱</div>
      </div>
    );
  }
};

export default Map;
