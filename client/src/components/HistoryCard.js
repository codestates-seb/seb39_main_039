import styled from "styled-components";
import sampleMap from "../assets/img/sample-map.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { DogNameLabel } from "./DogNameLabel";

const HistoryCard = ({ data }) => {
  const navigate = useNavigate();
  const startDay = new Date(data.startTime);
  const toDay = new Date();
  const diff = startDay - toDay;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));

  function diffDayData() {
    if (diffDay <= 0) {
      return `D+${-diffDay}`;
    }
    return `D-${diffDay}`;
  }

  console.log(data);

  return (
    <Card
      onClick={() => {
        navigate(`/walking/${data.walkId}`);
      }}
    >
      <div className="i1">{diffDayData()}</div>
      <div className="i2">
        <p>
          {data.petList?.map((el) => {
            return (
              <DogNameLabel
                size={"xxs"}
                name={el.petName}
                picture={el.petPicture}
              />
            );
          })}
        </p>
        <dl>
          <dt>산책 자</dt>
          <dd>{data.walker ? data.walker?.walkerName : "anonymous"}</dd>
          <dd>
            <img
              width={10}
              style={{ padding: 0 }}
              src={data.walker?.walkerPicture}
            />
          </dd>
        </dl>
        <dl>
          <dt>산책 시작일</dt>
          <dd>{new Date(data.startTime + "z").toLocaleString()}</dd>
        </dl>
        <dl>
          <dt>산책 종료일</dt>
          <dd>{new Date(data.endTime + "z").toLocaleString()}</dd>
        </dl>
      </div>
    </Card>
  );
};

export default HistoryCard;

const Card = styled.div`
  cursor: pointer;
  display: flex;
  overflow: hidden;
  border-radius: 20px;
  background: var(--white-000);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
  padding: 15px 20px 15px 0;

  .i1 {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    padding: 0 15px;
    border-right: 1px solid var(--gray-200);
    font-weight: 800;
    font-size: 20px;
    color: var(--gray-400);
  }
  .i2 {
    flex: 5;
    padding-left: 15px;
  }

  > div > dl {
    display: flex;
    margin: 7px 0;
    font-size: 13px;
    gap: 10px;

    dt {
      color: var(--gray-500);
      font-weight: 600;
    }
  }

  > div > p {
    span.xxs {
      padding-right: 0.5em;
      margin-right: 0.2em;
    }
    dl {
      font-size: 12px;
    }
  }
`;
