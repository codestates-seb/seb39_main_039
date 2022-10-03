import React, { useEffect } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

const weather = ({ currentWeather, loading }) => {
  return (
    <WeatherArea>
      {loading ? (
        <Loading>
          <ThreeDots color="#3183f8" height={80} width={80} />
        </Loading>
      ) : (
        <ul>
          <li className="weather-area">
            <div>
              <div className="icon">
                <img
                  src={`http://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@2x.png`}
                  alt=""
                />
              </div>
            </div>
            <div>
              <div className="area">{currentWeather?.name}</div>
              <div className="temp">
                <em>
                  {currentWeather.main?.temp.toFixed(1)} <small>°C</small>
                </em>
              </div>
            </div>
          </li>
          <li className="dust-area">
            <div>
              <span>습도</span>
              <p>{currentWeather.main?.humidity}%</p>
            </div>
            <div>
              <span>바람</span>
              <p>{currentWeather.wind.speed}m/s</p>
            </div>
          </li>
        </ul>
      )}
    </WeatherArea>
  );
};

export default weather;

const WeatherArea = styled.div`
  width: 100%;

  .weather-area {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .dust-area {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex: 1;

    > div {
      text-align: center;
      font-size: 12px;

      span {
        color: var(--gray-500);
      }
      p {
        padding: 4px 0 0;
        font-size: 14px;
      }
    }
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon img {
    width: 70px;
  }

  .area {
    color: var(--gray-500);
    font-size: 14px;
    font-weight: 600;
  }

  .temp {
    margin-top: 3px;

    em {
      font-size: 20px;
      font-weight: 800;
    }
    small {
      font-size: 80%;
    }
  }
`;

const Loading = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
