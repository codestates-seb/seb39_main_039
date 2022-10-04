import styled from "styled-components";
import Slider from "react-slick";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {
  NextArrow,
  PrevArrow,
} from "../../components/Button/SliderArrowButton";
import { DogCard, AnonymousDogCard } from "../../components/DogCard";
import Nav from "../../components/Layout/Nav";
import { useSelector, useDispatch } from "react-redux";
import { getMyPetInfo } from "../../redux/actions/petActions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CoachMarks from "../../components/Layout/CoachMarks";
import WeatherContainer from "../../components/WeatherContainer";
import RecommendPetPlace from "../../components/RecommendPetPlace";
import Cookies from "js-cookie";

const OwnerMain = () => {
  const dispatch = useDispatch();
  const { myPetInfo } = useSelector((state) => state.pet);

  const settings = {
    slide: "div",
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots",
    draggable: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    dispatch(getMyPetInfo());
    if (window) window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container bg-gray">
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
        <DogSlide>
          <Slider {...settings}>
            {myPetInfo?.map((el, idx) => (
              <DogCard key={idx} props={el} />
            ))}

            <AnonymousDogCard />
          </Slider>
        </DogSlide>
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
      {Cookies.get("coachCheck") === "false" && <CoachMarks />}
    </div>
  );
};

export default OwnerMain;

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
  padding: 20px 0;
  border-radius: 25px;
  margin-bottom: 10px;

  &.v2 {
    padding: 5px 0 5px 10px;
  }
`;

const DogSlide = styled.div`
  padding-bottom: 20px;
  .slick-slide {
    padding: 0 20px;
  }
  .slick-dots {
    li {
      width: auto;
      margin: 0 4px;
      button {
        width: 5px;
        height: 5px;
        background-color: var(--gray-300);
        border-radius: 50px;
        transition: all 0.5s;
      }
      button:before {
        content: "";
      }
    }
    .slick-active {
      button {
        width: 22px;
        background-color: var(--primary);
      }
    }
  }
`;

const Weather = styled.div`
  display: flex;
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
