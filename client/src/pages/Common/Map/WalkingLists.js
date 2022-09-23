import styled from "styled-components";
import { ReactComponent as Logo } from "../../../assets/img/logo.svg";
import RecordedMap from "../../../components/Map/RecordedMap";

const WalkingLists = () => {
  return (
    <div className="container bg-gray">
      <Header>
        <LogoArea>
          <Logo />
        </LogoArea>
      </Header>
      <Section>
        <UserSlide>
          <RecordedMap />
        </UserSlide>
      </Section>
      <Section></Section>
      <InfoSection></InfoSection>
    </div>
  );
};

export default WalkingLists;

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

const Section = styled.section`
  background: var(--white-000);
  padding: 20px;
  border-radius: 25px;
  margin-bottom: 10px;
`;

const UserSlide = styled.div`
  padding-bottom: 20px;
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
