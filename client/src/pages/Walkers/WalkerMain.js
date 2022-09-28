import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../components/Layout/Nav";
import { faBell, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import PlaceList from "../../components/PlaceList";
import WalkerCard from "../../components/WalkerCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWalkerUser } from "../../redux/actions/userActions";
import { getWalkerDetailInfo } from "../../redux/actions/walkerActions";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

const WalkerMain = () => {
  const { walkerUserInfo, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalkerUser());
  }, []);

  return (
    <div className="container bg-gray">
      {loading ? (
        <Loading>
          <ThreeDots color="#3183f8" height={80} width={80} />
        </Loading>
      ) : (
        <>
          <Header>
            <LogoArea>
              <Link to={"/"}>
                <Logo />
              </Link>
            </LogoArea>
            <Alert>
              <FontAwesomeIcon icon={faBell} />
            </Alert>
          </Header>
          <Section>
            <UserSlide>
              {walkerUserInfo.walkerId ? (
                <WalkerCard data={walkerUserInfo} />
              ) : (
                <ThreeDots color="#3183f8" height={80} width={80} />
              )}
            </UserSlide>
          </Section>
          <Section>
            <Weather>
              <p>날씨API 대기쓰</p>
            </Weather>
          </Section>
          <InfoSection>
            <h3>
              주변 강아지 동반 카페{" "}
              <small>
                <FontAwesomeIcon icon={faLocationDot} /> 강남구
              </small>
            </h3>
            <PlaceList />
          </InfoSection>
          <Nav />
        </>
      )}
    </div>
  );
};

export default WalkerMain;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;
const LogoArea = styled.div`
  svg {
    width: 55px;
  }
`;

const Alert = styled.div`
  font-size: 19px;
  color: var(--gray-600);
`;

const Section = styled.section`
  background: var(--white-000);
  padding: 20px;
  border-radius: 25px;
  margin-bottom: 10px;
`;

const UserSlide = styled.div`
  padding-bottom: 20px;
`;

const Weather = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const InfoSection = styled.section`
  margin: 20px 0 100px;
  h3 {
    font-size: 17px;
    small {
      font-size: 13px;
      margin-left: 9px;

      svg {
        color: var(--gray-400);
        font-size: 12px;
      }
    }
  }
`;

const Loading = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
