import styled from "styled-components";
import ArrowsSlide from "../../assets/img/arrows-slide.svg";

export const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <SliderArrows onClick={onClick} className={className}>
      메옹
    </SliderArrows>
  );
};

export const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <SliderArrows onClick={onClick} className={className}>
      야옹
    </SliderArrows>
  );
};

const SliderArrows = styled.div`
  top: 90px;
  width: 30px;
  height: 40px;
  background-image: url("${ArrowsSlide}");
  background-position: 0 50%;
  background-repeat: no-repeat;

  &:before {
    display: none;
  }

  &.slick-prev:hover,
  &.slick-prev:focus,
  &.slick-next:hover,
  &.slick-next:focus {
    background-color: url();
    opacity: 0.5;
  }

  &.slick-next {
    right: 45px;
    background-position: 100% 50%;
  }

  &.slick-prev {
    left: 45px;
  }
`;
