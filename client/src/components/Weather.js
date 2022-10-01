import React from "react";
import styled from "styled-components";

const weather = ({ data, error, loading }) => {
  return (
    <WeatherArea>
      <ul bordered title="Weather">
        <li label="Area">
          {loading && '대기쓰'}
          {error ? 'Q대기쓰' : data.area}
        </li>
        <li label="icon">
          {loading && '대기쓰'}
          {error ? 'Q대기쓰' : <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="" />}
        </li>
        <li label="Temp">
          {loading && '대기쓰'}
          {error ? 'Q대기쓰' : data.temp}
        </li>
        <li label="Weather">
          {loading && '대기쓰'}
          {error ? 'Q대기쓰' : data.weather}
        </li>
      </ul>
    </WeatherArea>
  );
};

export default weather;

const WeatherArea = styled.div`
  ul{
    display: flex;
    gap: 30px;

  }
`