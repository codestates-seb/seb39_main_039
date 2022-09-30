import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import RecordedMap from "../../components/Map/RecordedMap";
import { HeaderConfirm } from "../../components/Layout/Header";
import { DogNameLabel } from "../../components/DogNameLabel";
import { CheckListView } from "../../components/CheckListView";
import { StateCard } from "../../components/StateCard";
import ModalEndWalk from "../../components/Modal/ModalEndWalk";
import sampleImg from "../../assets/img/sample-img.png";
import {
  getWalkDetailInfo,
  closeWalk,
  getWalkingPetPicture
} from "../../redux/actions/mappingAction";

const Walking = () => {
  const walkId = useParams();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const WalkInfo = useSelector((state) => state.mapping.walkDetailInfo);
  const { walkingPetPicture } = useSelector((state) => state.mapping);
  const time = new Date(WalkInfo.endTime + "z").toLocaleString().slice(0, -3);
  const ClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const confirmHandler = () => {
    dispatch(closeWalk(walkId.id));
  };

  useEffect(() => {
    dispatch(getWalkDetailInfo(Number(walkId.id)));
    dispatch(getWalkingPetPicture(walkId.id));
  }, []);

  return (
    <div className="container pa0 v2">
      <ModalEndWalk
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        confirmHandler={confirmHandler}
      />
      <Section>
        <HeaderConfirm
          pageTitle={"진행중인 산책"}
          ConfirmName={WalkInfo.ended ? "" : `종료`}
          ClickHandler={ClickHandler}
        />
        <div className="walk-team">
          <dl className="walk-con">
            <dt>산책견</dt>
            <dd>
              {WalkInfo.petList?.map((el, idx) => {
                return (
                  <DogNameLabel
                    size={"xs"}
                    key={idx}
                    species={el.species}
                    name={el.petName}
                    picture={el.petPicture}
                  />
                );
              })}
            </dd>
          </dl>
          <dl className="walk-con v2">
            <dt>산책자</dt>
            <dd>
              <DogNameLabel
                size={"xs"}
                picture={WalkInfo.walker && WalkInfo.walker?.walkerPicture}
                name={
                  WalkInfo.walker ? WalkInfo.walker?.walkerName : "anonymous"
                }
              />
            </dd>
          </dl>
          <dl className="walk-con mb0">
            <dt>산책 예정시간</dt>
            <dd>
              <p>~ {time}까지</p>
            </dd>
          </dl>
        </div>
      </Section>
      <Sect className="map-area">
        <RecordedMap walkId={walkId.id} />
        <StateBoxArea className="pt25">
          <li>
            <StateCard type={"i1"} name={"산책"} count={WalkInfo.walkCount} />
          </li>
          <li>
            <StateCard type={"i2"} name={"배변"} count={WalkInfo.pooCount} />
          </li>
        </StateBoxArea>
        <StateBoxArea>
          <li>
            <StateCard type={"i3"} name={"식사"} count={WalkInfo.mealCount} />
          </li>
          <li>
            <StateCard type={"i4"} name={"간식"} count={WalkInfo.snackCount} />
          </li>
        </StateBoxArea>
      </Sect>
      <Sect>
        <div className="d-flex">
          <label htmlFor="" className="ipt-label">
            체크리스트
          </label>
          <em>수행률 {WalkInfo.progress}%</em>
        </div>
        <CheckListView>
          {WalkInfo.checkList?.map((el, idx) => {
            return (
              <li key={idx} className={el.checked ? "checked" : ""}>
                {el.content}
              </li>
            );
          })}
        </CheckListView>
      </Sect>
      <Sect>
        <label htmlFor="" className="ipt-label">
          사진 보관함
        </label>
        {walkingPetPicture.length === 0 ? (
          <div>등록된 사진이 없어요.</div>
        ) : (
          <ul className="list-horizonscroll">
            {walkingPetPicture?.map((item) => (
              <li>
                <img src={item} alt="" className="user-photo" />
              </li>
            ))}
          </ul>
        )}
      </Sect>
    </div>
  );
};

export default Walking;

const Section = styled.section`
  border-bottom: 9px solid var(--gray-100);
  padding: 20px;
  background: var(--white-000);

  &:first-child {
    padding-top: 0;
  }

  .walk-team {
    margin: 15px 0 0;

    .walk-con {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;

      > dt {
        position: relative;
        min-width: 60px;
        font-weight: 600;
        padding-right: 18px;
        line-height: 30px;
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
        p {
          line-height: 30px;
        }
      }
    }

    .walk-con.v2 {
      margin-bottom: 10px;
    }
  }
`;

const Sect = styled.section`
  margin: 0 20px;
  padding: 30px 0;
  border-bottom: 1px solid var(--gray-200);

  &.map-area {
    padding-top: 0;
    margin: 0;
  }

  .user-photo {
    cursor: pointer;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    margin-right: 10px;

    :hover {
      transition: 500ms;
      transform: scale(1.03);
    }
  }
`;

const StateBoxArea = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0 20px 8px;
  gap: 8px;

  > li {
    width: 50%;
  }
`;
