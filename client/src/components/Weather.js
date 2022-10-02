import React, { useEffect } from "react";
import styled from "styled-components";

const weather = ({ data, error, loading }) => {

  return (
    <WeatherArea>
      <ul>
        <li className="weather-area">
          <div>
            <div className="icon">
              {loading && '대기쓰'}
              {error ? 'Q대기쓰' : <img src={`http://openweathermap.org/img/wn/${data?.icon}@2x.png`} alt="" />}
            </div>
          </div>
          <div>
            <div className="area">
              {loading && '대기쓰'}
              {error ? 'Q대기쓰' : data.area} 
            </div>
            <div className="temp">
              {loading && '대기쓰'}
              <em>{error ? 'Q대기쓰' : data.temp} <small>°C</small></em> 
            </div>
          </div>
        </li>
        <li className="dust-area">
          <div>
            <span>미세</span>
            <p>보통</p>
          </div>
          <div>
            <span>초미세</span>
            <p>보통</p>
          </div>
        </li>
      </ul>
    </WeatherArea>
  );
};

export default weather;

const WeatherArea = styled.div`
  width:100%;

  .weather-area{
    display: flex;
    align-items: center;
    flex:1;
  }

  .dust-area{
    display: flex;
    justify-content: center;
    gap: 30px;
    flex:1;

    >div{
      text-align: center;
      font-size:12px;

      span{
        color: var(--gray-500);
      }
      p{
        padding:4px 0 0;
        font-size:14px;
      }
    }
  }

  ul{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .icon img{
    width:70px;
  }

  .area{
    color: var(--gray-500);
    font-size:14px;
    font-weight: 600;
  }

  .temp {
    margin-top:3px;

    em{
    font-size:20px;
    font-weight: 800;
    }
    small{
      font-size: 80%;
    }
  }
`