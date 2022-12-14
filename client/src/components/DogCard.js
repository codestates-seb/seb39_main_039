import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import sexIconMale from "../assets/img/sexIcon-male.svg";
import sexIconFemale from "../assets/img/sexIcon-female.svg";
import anonymousDog from "../assets/img/anonymousDog.svg";
import Arrows from "../assets/img/arrows.svg";
import ArrowsWh from "../assets/img/arrows-wh.svg";
import { ButtonPrimaryXS } from "./Button/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export const DogCard = (props) => {
  const navigate = useNavigate();
  const endDate = new Date(props.props.currentWalk?.endTime + "z")
    .toLocaleString()
    .slice(0, -3);

  let ago = moment(props.props.birthday).fromNow();
  let age;
  if (!ago.includes("years")) {
    age = "1";
  } else {
    age = Number(ago.split(" ")[0]) + 1;
  }

  return (
    <div>
      <DogProfile>
        <span className="photo-ring pic">
          <img
            style={{ backgroundImage: `url(${props.props.petPicture})` }}
            className={`img-circle`}
            alt=""
          />
        </span>
        <div className="dog-info">
          <div>
            <span>{props.props.species}</span>
            <strong className={props.props.sex}>{props.props.petName}</strong>
            <em>
              <FontAwesomeIcon icon={faCakeCandles} /> {props.props.birthday}
              <i>{age}세</i>
            </em>
          </div>
        </div>
      </DogProfile>
      <WalkState>
        {props.props.currentWalk === null ? (
          <NotWalk>
            <p>{props.props.petName}이는 산책중이 아니에요.</p>
          </NotWalk>
        ) : (
          <Walking
            onClick={() => {
              navigate(`/walking/${props.props.currentWalk?.walkId}`);
            }}
          >
            <div>
              <p>{props.props.currentWalk?.walker?.walkerName} 님과 산책중..</p>
              <small>{endDate}까지</small>
              <small>수행률 {props.props.currentWalk?.progress}%</small>
            </div>
          </Walking>
        )}
        <WalkBanner
          onClick={() => {
            window.location.replace(`/pendingWalk/${props.props.petId}`);
          }}
        >
          <div>
            <p>대기중인 산책</p>
          </div>
          <div>
            <b>{props.props.walkWaitingCount}</b>건
          </div>
        </WalkBanner>
        <WalkBanner
          onClick={() => {
            window.location.replace(`/walkerHistory/${props.props.petId}`);
          }}
        >
          <div>
            <p>지난 산책 내역</p>
            <small>총 {props.props.walkDistance}m</small>
          </div>
          <div>
            <b>{props.props.walkHistoryCount}</b>건
          </div>
        </WalkBanner>
      </WalkState>
    </div>
  );
};

export const AnonymousDogCard = () => {
  return (
    <div>
      <DogProfile>
        <span className="photo-ring">
          <img src={anonymousDog} className={`img-circle`} alt="" />
        </span>
        <div className="dog-info">
          <div>
            <strong className="anonymous">강아지를 등록해보세요.</strong>
            <em>
              <Link to="/dogAdd">
                <ButtonPrimaryXS>내 강아지 등록하기</ButtonPrimaryXS>
              </Link>
            </em>
          </div>
        </div>
      </DogProfile>
      <WalkState>
        <NotWalk>
          <p>산책중이 아니에요.</p>
        </NotWalk>
        <WalkBanner
          onClick={() => {
            window.location.replace(`/walkerHistory/0`);
          }}
        >
          <div>
            <p>지난 산책 내역</p>
            <small>총 0km</small>
          </div>
          <div>
            <b>0</b>건
          </div>
        </WalkBanner>
      </WalkState>
    </div>
  );
};

const DogProfile = styled.div`
  text-align: center;
  padding: 13px 0 6px;

  .photo-ring {
    display: inline-block;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.13);
    border-radius: 100px;
    img {
      width: 142px;
      border: 7px solid var(--white-000);
      vertical-align: bottom;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: auto 142px;
    }
  }

  .photo-ring.pic {
    img {
      height: 142px;
    }
  }

  .dog-info {
    display: flex;
    align-items: top;
    padding-top: 8px;
    justify-content: center;
    height: 100px;

    > div > * {
      display: block;
    }

    strong {
      display: inline-block;
      font-size: 24px;
      font-weight: 800;
      padding: 8px 0 8px 32px;
      background-repeat: no-repeat;
      background-position: 0 50%;
      background-size: 26px auto;
    }

    strong.수컷 {
      background-image: url("${sexIconMale}");
    }

    strong.암컷 {
      background-image: url("${sexIconFemale}");
    }

    strong.anonymous {
      padding-left: 0;
      padding-bottom: 5px;
      font-size: 19px;
      font-weight: 600;
      color: var(--gray-500);
    }

    em {
      padding-top: 2px;
      font-size: 18px;
      letter-spacing: -0.02em;
      svg {
        color: var(--gray-400);
      }
      i {
        position: relative;
        padding-left: 7px;
        margin-left: 7px;
      }
      i:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        display: inline-block;
        width: 3px;
        height: 3px;
        background: var(--gray-300);
      }
    }
  }
`;

const WalkState = styled.div`
  > * {
    display: flex;
    align-items: center;
    height: 70px;
    border-radius: 10px;
    padding: 0 25px;
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 8px;
    background-repeat: no-repeat;
    background-position: 94% 50%;
    cursor: pointer;
  }
`;

const Walking = styled.div`
  background-color: var(--primary);
  background-image: url("${ArrowsWh}");
  box-shadow: 0 0 15px 0 rgba(49, 130, 247, 0.6);
  color: var(--white-000);
  transition: all 0.5s;

  small {
    position: relative;
    font-size: 12px;
    padding-right: 7px;
    margin-right: 7px;
  }
  small + small:before {
    content: "";
    display: inline-block;
    position: absolute;
    left: -7px;
    top: 50%;
    margin-top: -4px;
    width: 1px;
    height: 10px;
    background: var(--white-000);
    opacity: 0.4;
  }

  &:hover {
    box-shadow: 0 0 15px 0 rgba(49, 130, 243, 0.9);
  }
`;

const NotWalk = styled.div`
  background-color: var(--gray-200);

  p {
    width: 100%;
    text-align: center;
    color: var(--gray-400);
  }
`;

const WalkBanner = styled.div`
  border: 1px solid var(--gray-300);
  background-image: url("${Arrows}");
  transition: all 0.5s;
  > div {
    flex: 1;
  }
  > div + div {
    text-align: right;
    padding-right: 20px;
  }
  b {
    font-weight: 800;
  }
  small {
    font-size: 12px;
  }

  &:hover {
    border-color: var(--primary);
  }
`;
