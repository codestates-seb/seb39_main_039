import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DogNameLabel } from "./DogNameLabel";

const PendingCard = ({ el }) => {
  const navigate = useNavigate();
  const startDay = new Date(el.startTime);
  const toDay = new Date();
  const diff = startDay - toDay;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));

  function diffDayData() {
    if (diffDay <= 0) {
      return "D-0";
    }
    return `D-${diffDay}`;
  }


  return (
    <Card onClick={() => {navigate(`/walking/${el.walkId}`);}}>
      <div className="i1">{diffDayData()}</div>
      <div className="i2">
        <p>
          {el.petList.map((el, idx) => {
            return (
              <DogNameLabel
                size={"xxs"}
                name={el.petName}
                picture={el.petPicture}
                key={idx}
              />
            );
          })}
        </p>
        <dl>
          <dt>산책 의뢰인</dt>
          <dd>{el.owner.fullName}</dd>
        </dl>
        <dl>
          <dt>산책 시작일</dt>
          <dd>{new Date(el.startTime + "z").toLocaleString()}</dd>
        </dl>
        <dl>
          <dt>산책 종료일</dt>
          <dd>{new Date(el.endTime + "z").toLocaleString()}</dd>
        </dl>
      </div>
    </Card>
  );
};

export default PendingCard;

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
