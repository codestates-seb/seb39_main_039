import styled from "styled-components";
import anonymousDog from "../assets/img/anonymousDog.svg";

export const DogNameLabel = ({ size, name, species, picture }) => {
  return (
    <Label className={size}>
      <span className="dog-photo">
        <img
          style={{ backgroundImage: `url(${picture})` }}
          className={`img-circle ${size}`}
          alt=""
        />
      </span>
      <dl>
        <dt>{species}</dt>
        <dd>{name}</dd>
      </dl>
    </Label>
  );
};

export const DogNameLabelType2 = ({ name, size, picture }) => {
  return (
    <Label className={`type2 ${size}`}>
      <span className="dog-photo">
        <img
          style={{ backgroundImage: `url(${picture})` }}
          className={`img-circle xs`}
          alt=""
        />
      </span>
      <dl>
        <dd>{name}</dd>
      </dl>
    </Label>
  );
};

export const AnonymousLabelType2 = () => {
  return (
    <Label className="type2 add">
      <span className="dog-photo">
        <img src={anonymousDog} className={`img-circle xs`} alt="" />
      </span>
      <dl>
        <dd>강아지 등록</dd>
      </dl>
    </Label>
  );
};

const Label = styled.span`
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  background: var(--white-000);
  border: 1px solid var(--gray-200);
  border-radius: 50px;
  padding: 0.2em 0.7em 0.2em 0.2em;
  margin-bottom:0.3em;

  .dog-photo {
    display: inline-block;
    margin-right: 0.3em;
    img {
      height: 25px;
      vertical-align: bottom;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 25px 25px;
    }
  }

  dl {
    display: flex;
    align-items: center;
    font-weight: 500;

    dt {
      color: var(--gray-600);
      border-right: 1px solid #ddd;
      padding-right: 0.4em;
      margin-right: 0.4em;
    }

    dt:empty {
      margin-left: -10px;
    }
  }

  &.xs {
    dl {
      font-size: 13px;
    }
  }

  &.type2 {
    cursor: pointer;
    padding: 4px 14px 4px 5px;
    border: 0;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.13);
    dl {
      margin-top: 0;
    }
  }

  &.type2.lg {
    padding: 4px 18px 1px 4px;
    .dog-photo {
      img {
        width: 34px;
        height: 34px;
      }
    }
  }

  &.add {
    color: var(--gray-500);
  }
`;
