import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import PlaceList from "../../components/PlaceList";
import WalkerCard from "../../components/WalkerCard";
import { MapForWalker } from "../Common";
import TrackingMap from "../../components/Map/TrackingMap";

const StartWalking = () => {
  return (
    <div className="container bg-gray">
      <Header>
        <LogoArea>
          <Logo />
        </LogoArea>
      </Header>
      <Section>
        <UserSlide>
          <TrackingMap />
        </UserSlide>
      </Section>
      <Section></Section>
      <InfoSection></InfoSection>
    </div>
  );
};

export default StartWalking;

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
