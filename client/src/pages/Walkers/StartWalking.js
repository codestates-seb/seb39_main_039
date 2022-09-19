import styled from "styled-components";
import { HeaderConfirm } from "../../components/Layout/Header";
import TrackingMap from "../../components/Map/TrackingMap";
import { DogNameLabel } from "../../components/DogNameLabel";
import { CheckingList } from "../../components/CheckListView";
import { StateCheckCard } from "../../components/StateCard";
import sampleImg from "../../assets/img/sample-img.png";
import { Checkbox } from "../../components/Inputs/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getWalkDetailInfo,
  changeCheckListState
} from "../../redux/actions/mappingAction";

const StartWalking = () => {
  const dispatch = useDispatch();
  const { walkDetailInfo } = useSelector((state) => state.mapping);

  const CountHandlerPlus = () => {
    console.log("카운트업");
  };

  const CountHandlerMinus = () => {
    console.log("카운트다운");
  };

  const change = (curState) => {
    // setIsChecked(!isChecked);
    dispatch(changeCheckListState(1, 1, curState));
  };

  useEffect(() => {
    dispatch(getWalkDetailInfo(1));
  }, []);

  return (
    <div className="container pa0">
      <Section>
        <HeaderConfirm pageTitle={"진행중인 산책"} />
        <div className="walk-team">
          <dl className="walk-con">
            <dt>산책견</dt>
            <dd>
              {walkDetailInfo.petList?.map((el, idx) => (
                <DogNameLabel
                  size={"xs"}
                  species={"시바견"}
                  name={el.petName}
                  key={idx}
                />
              ))}
            </dd>
          </dl>
          <dl className="walk-con">
            <dt>산책 예정시간</dt>
            <dd>~ 09-11 오후 20:00까지</dd>
          </dl>
        </div>
      </Section>
      <Sect className="map-area">
        <TrackingMap />
        <div className="stata-area">
          <StateBoxArea className="pt25">
            <li>
              <StateCheckCard
                type={"i1"}
                name={"산책"}
                count={"0"}
                CountHandlerPlus={CountHandlerPlus}
                CountHandlerMinus={CountHandlerMinus}
              />
            </li>
            <li>
              <StateCheckCard
                type={"i2"}
                name={"배변"}
                count={"0"}
                CountHandlerPlus={CountHandlerPlus}
                CountHandlerMinus={CountHandlerMinus}
              />
            </li>
          </StateBoxArea>
          <StateBoxArea>
            <li>
              <StateCheckCard
                type={"i3"}
                name={"식사"}
                count={"0"}
                CountHandlerPlus={CountHandlerPlus}
                CountHandlerMinus={CountHandlerMinus}
              />
            </li>
            <li>
              <StateCheckCard
                type={"i4"}
                name={"간식"}
                count={"0"}
                CountHandlerPlus={CountHandlerPlus}
                CountHandlerMinus={CountHandlerMinus}
              />
            </li>
          </StateBoxArea>
        </div>
      </Sect>
      <Sect>
        <div className="d-flex">
          <label htmlFor="" className="ipt-label">
            체크리스트
          </label>
          <em>수행률 33%</em>
        </div>
        <CheckingList>
          {walkDetailInfo.checkList?.map((el, idx) => (
            <li>
              <Checkbox text={el.content} func={change} key={idx} />
            </li>
          ))}
        </CheckingList>
      </Sect>
      <Sect>
        <label htmlFor="" className="ipt-label">
          사진 보관함
        </label>
        <ul className="list-horizonscroll">
          <li>
            <img src={sampleImg} alt="" />
          </li>
          <li>
            <img src={sampleImg} alt="" />
          </li>
          <li>
            <img src={sampleImg} alt="" />
          </li>
          <li>
            <img src={sampleImg} alt="" />
          </li>
          <li>
            <img src={sampleImg} alt="" />
          </li>
        </ul>
      </Sect>
    </div>
  );
};

export default StartWalking;

const Section = styled.section`
  border-bottom: 9px solid var(--gray-100);
  padding: 20px;
  background: var(--white-000);

  .walk-team {
    margin: 15px 0;

    .walk-con {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      > dt {
        position: relative;
        font-weight: 600;
        padding-right: 18px;
      }
      > dt:before {
        content: "";
        position: absolute;
        right: 7px;
        top: 50%;
        transform: translate(0, -50%);
        display: inline-block;
        width: 3px;
        height: 3px;
        background: var(--gray-200);
        border-radius: 10px;
      }
      > dd {
        span {
          margin-right: 5px;
        }
      }
    }

    .walk-con.v2 {
      margin-bottom: 20px;
    }
  }
`;

const Sect = styled.section`
  margin: 0 20px;
  padding: 30px 0;
  border-bottom: 1px solid var(--gray-200);

  &.map-area {
    padding: 0;
    margin: 0;
    border-bottom: 0;

    .stata-area {
      padding-bottom: 30px;
      margin: 0 20px 10px;
      border-bottom: 1px solid var(--gray-200);
    }
  }
`;

const StateBoxArea = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 8px;
  gap: 8px;

  > li {
    width: 50%;
  }
`;
