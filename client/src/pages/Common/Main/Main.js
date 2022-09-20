import styled from "styled-components";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonPrimaryLine
} from "../../../components/Button/Buttons";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import { ReactComponent as VisualImg } from "../../../assets/img/visualImg.svg";
import btnIcon01 from "../../../assets/img/buttonIcon01.svg";
import btnIcon02 from "../../../assets/img/buttonIcon02.svg";
import { useSelector } from "react-redux";

const Main = () => {
  const isLogin = useSelector((state) => state.login.isLogin);

  return (
    <div className="container">
      <MainIntro>
        <div>
          <Logo />
          <h2>
            믿을 수 있는
            <br />
            펫시터를 만나는
            <br />
            알바멍에서
            <br />
            안심 산책하세요!
          </h2>
          <p>
            <b>
              <CountUp duration={1} end={21310} separator="," />
            </b>
            마리의 강아지가 만족했어요.
          </p>

          <VisualImg />
          <ButtonGroup>
            <Link to={isLogin ? "/OwnerMain" : "/login"}>
              <ButtonPrimary className="icon-type">산책 맡길래요</ButtonPrimary>
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
        </div>
      </MainIntro>
    </div>
  );
};

export default Main;

const MainIntro = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
  }

  h2 {
    font-size: 28px;
    font-weight: 500;
    line-height: 1.25em;
    padding: 25px 0 18px;
  }

  p {
    font-size: 18px;
    b {
      font-weight: 800;
    }
  }
`;

const OptLink = styled.ul`
  display: flex;
  justify-content: center;
  margin: 20px 0 50px;
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
  position: absolute;
  display: block;
  width: 100%;
  text-align: center;
  bottom: 30px;
  font-size: 10px;
  color: var(--gray-400);
  letter-spacing: 0;
`;
