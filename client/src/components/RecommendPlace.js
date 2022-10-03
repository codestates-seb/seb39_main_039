import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecommendData,
  getLocation
} from "../redux/actions/recommendAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { ThreeDots } from "react-loader-spinner";

const RecommendPlace = () => {
  const dispatch = useDispatch();
  const { recommendData, location, locationLoading } = useSelector(
    (state) => state.recommend
  );

  const localLat = localStorage.getItem("lat");
  const localLon = localStorage.getItem("lon");

  useEffect(() => {
    if (localLat && localLon) {
      dispatch(getRecommendData(localLat, localLon));
      dispatch(getLocation(localLat, localLon));
    }
  }, [localLat, localLon]);

  return (
    <div>
      {locationLoading ? (
        <Loading>
          <ThreeDots color="#3183f8" height={80} width={80} />
        </Loading>
      ) : (
        <>
          <h3>
            주변 강아지 동반 카페{" "}
            <small>
              <FontAwesomeIcon icon={faLocationDot} />{" "}
              {location.documents[0].address?.region_2depth_name}
            </small>
          </h3>
          <PlaceList>
            {recommendData.documents?.map((item) => (
              <li>
                <div>
                  <div className="place-info">
                    <p>{item?.place_name}</p>
                    <span>{item?.distance / 1000}km 이내</span>
                  </div>
                </div>
              </li>
            ))}
          </PlaceList>
        </>
      )}
    </div>
  );
};

const PlaceList = styled.ul`
  gap: 15px;
  overflow: auto;
  white-space: nowrap;
  margin-top: 10px;
  margin-right: -20px;

  li {
    display: inline-block;
    width: 140px;
    > div {
      overflow: hidden;
      border-radius: 15px;
      background: var(--white-000);
    }
  }
  li + li {
    margin-left: 10px;
  }

  .place-img img {
    width: 100%;
  }

  .place-info {
    padding: 10px 15px 15px;

    p {
      font-weight: 600;
      padding-bottom: 3px;
    }
    span {
      font-size: 12px;
      color: var(--gray-500);
    }
  }
`;

const Loading = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export default RecommendPlace;
