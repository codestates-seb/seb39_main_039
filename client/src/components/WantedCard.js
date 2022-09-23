import styled from "styled-components";
import { DogNameLabel } from "./DogNameLabel";
import { useNavigate } from "react-router-dom";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useConvertTime from "../hooks/useConvertTime";
import { useDispatch } from "react-redux";
import { getWantedDetail } from "../redux/actions/wantedActions";

const WantedCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let endTimeForm = useConvertTime(
    item.walk.endTime.toLocaleString().slice(0, -3).split("T")
  );

  let startTimeForm = useConvertTime(
    item.walk.startTime.toLocaleString().slice(0, -3).split("T")
  );

  return (
    <Card
      onClick={() => {
        navigate(`/wantedDetail/${item.wantedId}`);
        dispatch(getWantedDetail(item.wantedId));
      }}
    >
      <div className="con-dogs">
        {item.petList?.map((item) => (
          <DogNameLabel
            species={item.species}
            name={item.petName}
            size={"xs"}
            picture={item.petPicture}
            key={item.petId}
          />
        ))}
      </div>
      <div className="title">
        <p className={item.matched ? "con-title" : "con-title no-matched"}>
          <em>{item.matched ? "매칭 완료" : "매칭 중"}</em>
        </p>
        <span>{item.title}</span>
      </div>
      <ul className="con-info">
        <li>
          <dl>
            <dt>
              <FontAwesomeIcon icon={faLocationDot} /> 지역
            </dt>
            <dd>{item?.location}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <FontAwesomeIcon icon={faSackDollar} /> 보수
            </dt>
            <dd>{item?.pay}원</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <FontAwesomeIcon icon={faDog} /> 시간
            </dt>
            <dd>
              {`${startTimeForm[0]}-${startTimeForm[1]} ${startTimeForm[2]}:${startTimeForm[3]}`}{" "}
              ~{" "}
              {`${endTimeForm[0]}-${endTimeForm[1]} ${endTimeForm[2]}:${endTimeForm[3]}`}
            </dd>
          </dl>
        </li>
      </ul>
    </Card>
  );
};

export default WantedCard;

const Card = styled.div`
  background: var(--white-000);
  padding: 12px;
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  cursor: pointer;

  .con-dogs {
    gap: 5px;
    > * {
      margin-right: 5px;
    }
  }

  .con-title {
    font-weight: 800;
    margin: 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    em {
      display: inline-block;
      padding: 6px 6px;
      font-size: 0.75em;
      border-radius: 5px;
      background: var(--primary);
      color: var(--white-000);
      margin-right: 4px;
    }
  }

  .no-matched {
    em {
      background: var(--white-000);
      color: var(--primary);
      border: 1px solid var(--primary);
    }
  }

  .con-info {
    dl {
      display: flex;
      font-size: 11px;
      margin: 7px 0;
    }
    dt {
      color: var(--gray-500);
      margin-right: 10px;
      font-weight: 500;

      svg {
        opacity: 0.8;
        width: 12px;
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }

  &:hover {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.07);
  }
`;
