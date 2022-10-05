import styled from "styled-components";
import logo from "../../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../components/Layout/Nav";
import { faBell, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import PlaceList from "../../components/PlaceList";
import WalkerCard from "../../components/WalkerCard";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getWalkerUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import WeatherContainer from "../../components/WeatherContainer";
import RecommendPetPlace from "../../components/RecommendPetPlace";

const WalkerMain = () => {
  const { walkerUserInfo, loading } = useSelector((state) => state.user);
  const { weatherLoading } = useSelector((state) => state.weather);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalkerUser());
    if (window) window.scrollTo(0, 0);
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
                <img src={logo} className="logo-bi" />
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
          <Section className="v2">
            <Weather>
              <WeatherContainer />
            </Weather>
          </Section>
          <InfoSection>
            <RecommendPetPlace />
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

  .logo-bi {
    position: absolute;
    top: 10px;
    left: 22px;
    width: 80px;
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

  &.v2 {
    padding: 10px 0 10px 10px;
  }
`;

const UserSlide = styled.div`
  padding-bottom: 0;
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
