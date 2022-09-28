import React, { useEffect } from "react";
import styled from "styled-components";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonPrimaryLine
} from "../../../components/Button/Buttons";
import { ReactComponent as Logo } from "../../../assets/img/logo-wh.svg";
import { ReactComponent as VisualImg } from "../../../assets/img/visualImg.svg";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../../../redux/actions/userActions";
import btnIcon01 from "../../../assets/img/buttonIcon01.svg";
import btnIcon02 from "../../../assets/img/buttonIcon02.svg";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Main = () => {
  const isLogin = Cookies.get("access");
  const { userInfo } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());

    if (isLogin){
      const token = Cookies.get('access');
      const deToken = jwt_decode(token);
      localStorage.setItem('user', deToken.id)
    }
  }, []);

  return (
    <div className="container pa0">
      <MainIntro>
        <div>
          <Logo className="logo-bi" />
          <h2>
            <b>믿을 수 있는</b>
            <br />
            펫시터를 만나는
            <br />
            <b>알바멍</b>에서
            <br />
            안심 산책하세요!
          </h2>
          <p>
            <b>
              <CountUp duration={1} end={21310} separator="," />
            </b>
            마리의 <br />
            강아지가
            <br /> 만족했어요.
          </p>

          <BottomArea>
            <VisualImg className="visual-img" />
            {isLogin && (
              <LoginUser>
                <div>
                  <img
                    src={userInfo.profileImage}
                    className="img-circle xs"
                    alt=""
                  />
                </div>
                <div>
                  <b>{userInfo.nickName} 님</b> 반가워요!
                </div>
              </LoginUser>
            )}
            <ButtonGroup>
              <Link to={isLogin ? "/OwnerMain" : "/login"}>
                <ButtonPrimary className="icon-type">
                  산책 맡길래요
                </ButtonPrimary>
              </Link>
              <Link to={isLogin ? "/WalkerMain" : "/login"}>
                <ButtonPrimaryLine className="icon-type v2">
                  산책 시킬래요
                </ButtonPrimaryLine>
              </Link>
            </ButtonGroup>
            <OptLink>
              <li>
                <Link to="/">서비스 요금</Link>
              </li>
              <li>
                <Link to="/">이용 가이드</Link>
              </li>
            </OptLink>
            <Copyright>copyright 2022. TEAM39. All rights reserved. </Copyright>
          </BottomArea>
        </div>
      </MainIntro>
    </div>
  );
};

export default Main;

const LoginUser = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0 0 15px 13px;
  font-size: 18px;

  img {
    border: 1px solid var(--gray-100);
  }
  b {
    font-weight: 600;
  }
`;

const MainIntro = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  justify-content: center;
  background: rgb(50, 134, 255);
  background: linear-gradient(
    180deg,
    rgba(50, 134, 255, 1) 0%,
    rgba(69, 98, 254, 1) 100%
  );

  > div {
    width: 100%;
    text-align: left;
    padding: 0 40px;
  }

  .logo-bi {
    position: absolute;
    top: 30px;
    right: 40px;
  }
  .visual-img {
    position: absolute;
    transform: translate(0, -96%);
    right: 0;
    z-index: 99;
    width: 250px;
    height: 360px;
  }

  h2 {
    font-size: 34px;
    font-weight: 400;
    line-height: 1.25em;
    padding: 60px 0 18px;
    color: var(--white-000);
    letter-spacing: -0.055em;

    b {
      font-weight: 800;
    }
  }

  p {
    font-size: 16px;
    color: var(--white-000);
    margin-top: 10px;
    line-height: 1.3em;
    b {
      font-weight: 800;
    }
  }
`;

const BottomArea = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background: var(--white-000);
  padding: 40px 30px 25px;
  border-top-left-radius: 30px;
`;

const OptLink = styled.ul`
  display: flex;
  justify-content: center;
  margin: 20px 0 30px;
  li {
    position: relative;
    font-size: 12px;
    padding: 0 23px;
    a {
      color: var(--gray-400);
    }
  }

  li + li:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 0;
    width: 1px;
    height: 10px;
    background: var(--gray-200);
    transform: translate(0, -50%);
  }
`;

const ButtonGroup = styled.div`
  margin-top: -5px;
  a {
    display: block;
  }
  a + a {
    margin-top: 5px;
  }
  button {
    &.icon-type {
      background-image: url("${btnIcon01}");
      background-repeat: no-repeat;
      background-position: 8px 50%;
    }

    &.icon-type.v2 {
      background-image: url("${btnIcon02}");
    }
  }
`;

const Copyright = styled.small`
  display: block;
  width: 100%;
  text-align: center;
  bottom: 30px;
  font-size: 10px;
  color: var(--gray-400);
  letter-spacing: 0;
`;
