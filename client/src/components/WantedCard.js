import styled from "styled-components";
import { DogNameLabel } from "./DogNameLabel";
import { useNavigate } from "react-router-dom";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import useConvertTime from "../hooks/useConvertTime";
import { useDispatch, useSelector } from "react-redux";
import { getWantedDetail } from "../redux/actions/wantedActions";
import moment from "moment";
import gradationImg from "../assets/img/gdt.png";

const WantedCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let endTimeForm = new Date(item.walk?.startTime + "z")
    .toLocaleString()
    .slice(0, -3);

  let startTimeForm = new Date(item.walk?.endTime + "z")
    .toLocaleString()
    .slice(0, -3);

  let timeZone = moment(item.creationDate).add(9, "hours").fromNow();
  let ago;
  if (timeZone.includes("day")) {
    ago = moment(item.creationDate).format("YYYY-MM-DD");
  } else {
    ago = timeZone;
  }

  return (
    <Card
      onClick={() => {
        dispatch(getWantedDetail(item.wantedId));
        navigate(`/wantedDetail/${item.wantedId}`);
      }}
    >
      <div className="con-dogs">
        {item.walk.petList?.map((item) => (
          <DogNameLabel
            species={item.species}
            name={item.petName}
            size={"xs"}
            picture={item.petPicture}
            key={item.petId}
          />
        ))}
        <i className="gradation"></i>
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
              {startTimeForm}~ {endTimeForm}
            </dd>
            <dt>
              <em>{ago} </em>
              <FontAwesomeIcon icon={faComment} />
              {"   "}
              {item.commentCount}
            </dt>
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
    position: relative;
    gap: 5px;
    overflow: auto;
    white-space: nowrap;
    > span {
      margin-right: 3px;
    }

    dl {
      font-size: 12px;
    }
  }

  .title {
    margin: 3px 0;
  }
  .con-title {
    font-weight: 800;
    margin: 0 0 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    em {
      display: inline-block;
      padding: 5px 5px 4px;
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
    li {
      position: relative;
      display: flex;
      dl {
        flex: 1;
      }
    }
    dl {
      display: flex;
      font-size: 11px;
      margin: 4px 0;
      align-items: flex-end;
    }
    dt {
      color: var(--gray-500);
      margin-right: 5px;
      font-weight: 500;

      svg {
        opacity: 0.8;
        width: 12px;
      }
    }

    dt:nth-child(3) {
      position: absolute;
      right: 0;
    }

    em {
      margin-right: 3px;
      letter-spacing: 0;
    }

    em {
      margin-right: 5px;
    }
  }

  .title {
    display: flex;
    align-items: center;
    span {
      margin-left: 3px;
      font-weight: 600;
    }
    > em {
      position: absolute;
      right: 30px;
      font-size: 13px;
      color: var(--gray-500);
    }
  }

  &:hover {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.07);
  }
`;
