import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecommendData,
  getLocation,
} from "../redux/actions/recommendAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { ThreeDots } from "react-loader-spinner";
import { petPlaceImage } from "../constants/petPlaceImage";

const RecommendPetPlace = () => {
  const dispatch = useDispatch();
  const { recommendData, location, locationLoading, recommendLoading } =
    useSelector((state) => state.recommend);

  console.log(locationLoading);

  let lat = localStorage.getItem("lat");
  let lon = localStorage.getItem("lon");

  useEffect(() => {
    if (lat && lon) {
      dispatch(getRecommendData(lat, lon));
      dispatch(getLocation(lat, lon));
    }
  }, [lat, lon]);

  return (
    <div>
      {locationLoading ? (
        <></>
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
            {recommendData.documents?.map((item, idx) => (
              <a href={item.place_url} target="_blank">
                <li>
                  <div>
                    <span className="place-img">
                      <img src={petPlaceImage[idx]} alt="" />
                    </span>
                    <div className="place-info">
                      <p>{item?.place_name}</p>
                      <span>{(item?.distance / 1000).toFixed(1)}km 거리</span>
                    </div>
                  </div>
                </li>
              </a>
            ))}
          </PlaceList>
        </>
      )}
    </div>
  );
};

export default RecommendPetPlace;

const PlaceList = styled.ul`
  gap: 15px;
  overflow: auto;
  white-space: nowrap;
  margin-top: 10px;
  margin-right: -20px;

  a {
    color: black;
  }
  a:visited {
    color: black;
  }

  li {
    display: inline-block;
    width: 140px;
    > div {
      overflow: hidden;
      border-radius: 15px;
      background: var(--white-000);
    }
  }

  li:hover {
    transition: 500ms;
    transform: scale(1.03);
  }

  a + a {
    margin-left: 10px;
  }

  .place-img img {
    width: 100%;
    height: 100px;
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
