import styled from "styled-components";
import noImage from "../assets/img/noImage.svg";
import Arrows from "../assets/img/arrows.svg";
import ArrowsWh from "../assets/img/arrows-wh.svg";
import { useNavigate } from "react-router-dom";
import { getWalkerUser, getUserInfo } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const WalkerCard = () => {
  const navigate = useNavigate();
  const { walkerUserInfo, userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalkerUser());
    dispatch(getUserInfo());
  }, []);

  console.log(walkerUserInfo);

  return (
    <div>
      <WalkerProfile>
        <span className="photo-ring">
          <img
            src={walkerUserInfo.profileImage}
            className={`img-circle`}
            alt=""
          />
        </span>
        <div className="dog-info">
          <div>
            <strong>{userInfo.fullName}</strong>
            <em>{walkerUserInfo.phone}</em>
          </div>
        </div>
      </WalkerProfile>
      <WalkState>
        <NotWalk>
          <div>
            <p>산책 할 강아지가 없어요 🐶</p>
          </div>
        </NotWalk>
        <Walking
          onClick={() => {
            navigate("/walk/1/walking");
          }}
        >
          <div>
            <p>춘식 외 2마리와 산책 하기</p>
            <small>09.15 오후 4:00 부터 시작</small>
          </div>
        </Walking>
        <WalkBanner
          onClick={() => {
            navigate("/walk/1/wantedHistory");
          }}
        >
          <div>
            <p>대기중인 산책</p>
          </div>
          <div>
            <b>{walkerUserInfo.walkWaitingCount}</b>건
          </div>
        </WalkBanner>
        <WalkBanner
          onClick={() => {
            navigate("/walk/1/wantedHistory");
          }}
        >
          <div>
            <p>지난 산책 내역</p>
            <small>총 {walkerUserInfo.walkDistance} km</small>
          </div>
          <div>
            <b>{walkerUserInfo.walkHistoryCount}</b>건
          </div>
        </WalkBanner>
      </WalkState>
    </div>
  );
};

export default WalkerCard;

const WalkerProfile = styled.div`
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
      padding: 8px 0;
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
  }
`;

const Walking = styled.div`
  background-color: var(--primary);
  background-image: url("${ArrowsWh}");
  color: var(--white-000);
  box-shadow: 0 0 15px 0 rgba(49, 130, 247, 0.6);
  cursor: pointer;

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
`;

const NotWalk = styled.div`
  background-color: var(--gray-200);
  div {
    width: 100%;
  }
  p {
    text-align: center;
    color: var(--gray-400);
  }
`;

const WalkBanner = styled.div`
  border: 1px solid var(--gray-300);
  background-image: url("${Arrows}");
  cursor: pointer;

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
`;
