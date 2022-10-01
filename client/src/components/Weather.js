import React from "react";

const weather = ({ data, error, loading, getWeatherData }) => {
  return (
    <div>
      <div bordered title="Weather">
        <div label="Area">
          {loading && '대기쓰'}
          {error ? 'Q대기쓰' : data.area}
        </div>
        <div label="Temp">
          {loading && '대기쓰'}
          {error ? 'Q대기쓰' : data.temp}
        </div>
        <div label="Weather">
          {loading && '대기쓰'}
          {error ? 'Q대기쓰' : data.weather}
        </div>
      </div>
    </div>
  );
};

export default weather;