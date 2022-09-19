import React, { useState } from "react";
import styled from "styled-components";
import { HeaderConfirm } from "../../components/Layout/Header";
import TrackingMap from "../../components/Map/TrackingMap";
import { DogNameLabel } from "../../components/DogNameLabel";
import { CheckListView } from "../../components/CheckListView";
import { StateCard } from "../../components/StateCard";
import ModalEndWalk from "../../components/Modal/ModalEndWalk";
import sampleImg from "../../assets/img/sample-img.png";

const Walking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const confirmHandler = () => {
    console.log("종료 함수");
  };

  return (
    <div className="container pa0">
      <ModalEndWalk
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        confirmHandler={confirmHandler}
      />
      <Section>
        <HeaderConfirm
          pageTitle={"진행중인 산책"}
          ConfirmName={"종료"}
          ClickHandler={ClickHandler}
        />
        <div className="walk-team">
          <dl className="walk-con">
            <dt>산책견</dt>
            <dd>
              <DogNameLabel size={"xs"} species={"시바견"} name={"춘식"} />
              <DogNameLabel size={"xs"} species={"시바견"} name={"춘식"} />
            </dd>
          </dl>
          <dl className="walk-con v2">
            <dt>산책자</dt>
            <dd>
              <DogNameLabel size={"xs"} name={"이지은"} />
            </dd>
          </dl>
          <dl className="walk-con">
            <dt>산책 예정시간</dt>
            <dd>~ 09-11 오후 20:00까지</dd>
          </dl>
        </div>
      </Section>
      <Sect>
        <TrackingMap />
        <StateBoxArea className="pt25">
          <li>
            <StateCard type={"i1"} name={"산책"} count={"0"} />
          </li>
          <li>
            <StateCard type={"i2"} name={"배변"} count={"0"} />
          </li>
        </StateBoxArea>
        <StateBoxArea>
          <li>
            <StateCard type={"i3"} name={"식사"} count={"0"} />
          </li>
          <li>
            <StateCard type={"i4"} name={"간식"} count={"0"} />
          </li>
        </StateBoxArea>
      </Sect>
      <Sect>
        <div className="d-flex">
          <label htmlFor="" className="ipt-label">
            체크리스트
          </label>
          <em>수행률 33%</em>
        </div>
        <CheckListView>
          <li className="checked">간식 먹이기 전에 훈련을 해주세요.</li>
          <li className="checked">
            간식 먹이기 전에 훈련을 해주세요. 간식 먹이기 전에 훈련을 간식
            먹이기 전에 훈련을 해주세요.해주세요.{" "}
          </li>
          <li>올림픽공원 산책을 해주세요.</li>
          <li>가방에 있는 영양제 1포를 먹여주세요.</li>
          <li>
            가방에 있는 영양제 1포를 먹여주세요. 가방에 있는 영양제 1포를
            먹여주세요. 가방에 있는 영양제 1포를 먹여주세요.
          </li>
        </CheckListView>
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

export default Walking;

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
