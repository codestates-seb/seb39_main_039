import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import iconi1 from "../assets/img/icon-i1.svg";
import iconi2 from "../assets/img/icon-i2.svg";
import iconi3 from "../assets/img/icon-i3.svg";
import iconi4 from "../assets/img/icon-i4.svg";

export const StateCard = ({ type, name, count }) => {
  return (
    <Card>
      <div>
        <i className={type}></i>
        <span>{name}</span>
      </div>
      <div>
        <b>{count}</b>
        <em>회</em>
      </div>
    </Card>
  );
};

export const StateCheckCard = ({
  type,
  name,
  count,
  CountHandlerPlus,
  CountHandlerMinus
}) => {
  return (
    <CardCheck>
      <div>
        <div>
          <i className={type}></i>
          <span>{name}</span>
        </div>
        <div>
          <b>{count}</b>
          <em>회</em>
        </div>
      </div>
      <div className="count-area">
        <div onClick={CountHandlerMinus}>
          <FontAwesomeIcon icon={faMinus} />
        </div>
        <div onClick={CountHandlerPlus} className="plus">
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    </CardCheck>
  );
};

const Card = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--gray-200);
  border-radius: 15px;
  padding: 0 19px;
  min-height: 80px;

  > div {
    display: flex;
    align-items: center;
  }
  span {
    font-size: 13px;
    font-weight: 600;
    color: var(--gray-500);
  }
  b {
    font-weight: 800;
    font-size: 22px;
  }
  em {
    margin-left: 3px;
    font-size: 13px;
    font-weight: 600;
  }
  i {
    display: inline-block;
    width: 37px;
    height: 37px;
    border: 1px solid var(--gray-200);
    border-radius: 100px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 18px 18px;
    margin-right: 5px;
  }
  i.i1 {
    background-image: url("${iconi1}");
  }
  i.i2 {
    background-image: url("${iconi2}");
  }
  i.i3 {
    background-image: url("${iconi3}");
  }
  i.i4 {
    background-image: url("${iconi4}");
  }
`;

const CardCheck = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 15px 0 0;

  min-height: auto;
  > div {
    width: 100%;
    padding: 0 17px;
    justify-content: space-between;
  }
  > div > div {
    display: flex;
    align-items: center;
  }

  .count-area {
    padding: 0;
    margin-top: 15px;
    border-top: 1px solid var(--gray-200);

    > div:first-child {
      border-right: 1px solid var(--gray-100);
    }
    > div {
      flex: 1;
      justify-content: center;
      padding: 12px 0;
      svg {
        color: var(--gray-500);
      }
    }
    > div.plus {
      svg {
        color: var(--primary);
      }
    }

    > div:hover {
      background-color: var(--gray-050);
    }
  }
`;
