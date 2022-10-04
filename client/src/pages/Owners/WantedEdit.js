import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Layout/Header";
import {
  ButtonPrimary,
  ButtonPrimaryXS,
} from "../../components/Button/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { ko } from "date-fns/esm/locale";
import { useInputAutoHeight } from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { getWantedDetail } from "../../redux/actions/wantedActions";
import { getMyPetInfo } from "../../redux/actions/petActions";
import { modifyWanted } from "../../redux/actions/wantedActions";
import CitySelect from "../../components/CitySelect";
import { ToastContainer } from "react-toast";

const WantedEdit = () => {
  const { myPetInfo } = useSelector((state) => state.pet);
  const { wantedDetail } = useSelector((state) => state.wanted);
  const [wantedTitle, setWantedTitle] = useState(wantedDetail.title);
  const [wantedCaution, setWantedCaution] = useState(
    wantedDetail.walk?.caution
  );
  const [wantedReward, setWantedReward] = useState(wantedDetail.pay);
  const [putError, setPutError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // 지역 모달창 여닫기
  const [checkedList, setCheckedList] = useState([]);
  const [petChecked, setPetChecked] = useState([]);
  const [region, setRegion] = useState(wantedDetail.cityId); //지역 id받아오는 state
  const [regionName, setRegionName] = useState(""); // 지역 이름 담기
  const [regionNamePick, setRegionNamePick] = useState(wantedDetail.location); //지역이름 선택 하면! input값으로 넣기
  const [checklistData, setCheckListData] = useState([
    ...wantedDetail.walk.checkList?.map((el) => el.content),
  ]);
  const [startDate, setStartDate] = useState(
    new Date(wantedDetail.walk.startTime + "z")
  );
  const [endDate, setEndDate] = useState(
    new Date(wantedDetail.walk.endTime + "z")
  );

  const dispatch = useDispatch();
  const { id } = useParams();
  const regionRef = useRef(); //선택 후 지역 인풋 포커싱

  const cityModal = () => {
    //모달창 여닫기
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  const regionConfirmHandler = () => {
    //지역정보 받아오기
    setRegionNamePick(regionName);
    setIsOpen(false);
    document.body.style.overflow = "unset";
    regionRef.current.focus();
  };

  const onCheckPetElement = (checked, item) => {
    if (checked) {
      setPetChecked([...petChecked, item]);
    } else {
      setPetChecked(petChecked.filter((el) => el !== item));
    }
  };

  const onCheckListElement = (checked, value) => {
    console.log(checked, value);
    if (checked) {
      setCheckedList([...checkedList, value]);
    } else {
      setCheckedList(checkedList.filter((el) => el !== value));
    }
  };

  const [
    checkItemContent,
    lineHeight,
    checkItemChangeHandler,
    checkItemEnterHandler,
  ] = useInputAutoHeight("");

  const putWanted = () => {
    dispatch(
      modifyWanted(
        wantedCaution,
        checkedList,
        region,
        endDate,
        wantedReward,
        petChecked,
        startDate,
        wantedTitle,
        id
      )
    ).then((res) => setPutError(res));
  };

  const addCheckList = (title) => {
    setCheckListData([...checklistData, title]);
  };

  const deleteCheckList = (id, idx) => {
    setCheckListData(checklistData.filter((el, idx2) => idx !== idx2));
  };

  useEffect(() => {
    dispatch(getWantedDetail(id));
    dispatch(getMyPetInfo());
  }, []);

  return (
    <div className="container v2">
      <Header pageTitle={"구인 글 수정"} />
      <CitySelect
        isOpen={isOpen} //모달 여닫기
        setIsOpen={setIsOpen} //모달 여닫기
        setRegion={setRegion} // 지역 id값 담기
        setRegionName={setRegionName} // 지역 명 담기
        confirmHandler={regionConfirmHandler} //지역 정보 받아오며 모달 닫기
      />
      <Form>
        <Section className="pt0 pb20">
          <div className="ipt-group">
            <label htmlFor="" className="ipt-label">
              제목
            </label>
            {putError && (wantedTitle?.length === 0 || !wantedTitle) && (
              <Error>제목을 입력해주세요</Error>
            )}
            <input
              onChange={(e) => setWantedTitle(e.target.value)}
              value={wantedTitle}
              type="text"
              className="ipt-form"
              name="username"
              placeholder="제목을 입력해주세요."
            />
          </div>
          <label className="ipt-label">산책할 강아지 선택</label> (기존 강아지 :{" "}
          {wantedDetail.walk.petList.map((el) => {
            return <span>{el.petName} </span>;
          })}
          )
          <DogSelect>
            {myPetInfo?.map((el, idx) => (
              <li>
                <DogCheckBoxLabel key={el.petId} htmlFor={el.petName}>
                  <DogCheckBox
                    defaultChecked={false}
                    type="checkbox"
                    name={el.petName}
                    onChange={(e) => {
                      onCheckPetElement(e.target.checked, el.petId);
                    }}
                  />
                  <span>
                    <img width={50} src={el.petPicture} />
                    <span>{el.petName}</span>
                  </span>
                </DogCheckBoxLabel>
              </li>
            ))}
            {(petChecked?.length === 0 || !petChecked) && (
              <Error className="select-pet">산책할 강아지를 선택해주세요</Error>
            )}
          </DogSelect>
        </Section>
        <Section className="pb20">
          <div className="ipt-group">
            <label htmlFor="" className="ipt-label">
              지역
            </label>
            <input
              type="text"
              className="ipt-form"
              value={regionNamePick} // 선택한 지역명 값에 담기
              ref={regionRef}
              onChange={(data) => console.log(data)} // value써서 임시로 넣은 기능없는 onChange
              onClick={cityModal}
            />
          </div>

          <div className="ipt-group">
            <label htmlFor="" className="ipt-label">
              산책 희망 시간
            </label>
            {putError && (
              <Error className="select-pet">
                현재 날짜보다 이후 날짜를 선택해주세요
              </Error>
            )}
            <small className="ipt-label-sm pt10">시작 시간</small>
            <DatePicker
              locale={ko}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              minTime={setHours(setMinutes(new Date(), 0), 17)}
              maxTime={setHours(setMinutes(new Date(), 30), 40)}
              minDate={new Date()}
              dateFormat=" yyyy년 MMMM d일,  aa h:mm"
            />

            <small className="ipt-label-sm">종료 시간</small>
            <DatePicker
              locale={ko}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              minTime={setHours(setMinutes(new Date(), 0), 17)}
              maxTime={setHours(setMinutes(new Date(), 30), 40)}
              dateFormat=" yyyy년 MMMM d일,  aa h:mm"
            />
          </div>

          <div className="ipt-group">
            <label htmlFor="" className="ipt-label">
              산책 보수
            </label>
            <div className="ipt-unit">
              <input
                type="text"
                className="ipt-form"
                name="username"
                placeholder="예)100,000"
                onChange={(e) => setWantedReward(e.target.value)}
                value={wantedReward}
              />
              <span>원</span>
            </div>
          </div>
        </Section>
        <Section>
          <label className="ipt-label">체크리스트</label>
          <ConCheckList>
            {checklistData.map((el, idx) => (
              <li>
                <label htmlFor={el.content}>
                  <span>
                    <DogCheckBox
                      key={el.checkListId}
                      type="checkbox"
                      name={el.content}
                      onChange={(e) => {
                        onCheckListElement(e.target.checked, el);
                      }}
                    />
                    <span>{el}</span>
                  </span>
                  <span>
                    <ButtonPrimaryXS onClick={() => deleteCheckList(el, idx)}>
                      삭제
                    </ButtonPrimaryXS>
                  </span>
                </label>
              </li>
            ))}
          </ConCheckList>
          <ChackEntryInput>
            <textarea
              className="ipt-form auto-height"
              placeholder="체크리스트를 추가 할 수 있습니다"
              value={checkItemContent}
              onChange={(e) => checkItemChangeHandler(e)}
              onKeyDown={checkItemEnterHandler}
              style={{ height: lineHeight * 27 + 27 + "px" }}
            ></textarea>
            <small onClick={() => addCheckList(checkItemContent)}>
              <FontAwesomeIcon icon={faCirclePlus} /> 추가
            </small>
          </ChackEntryInput>
        </Section>
        <Section className="bb0 pb0">
          <label className="ipt-label">기타 주의사항</label>
          <textarea
            className="ipt-form"
            placeholder="기타 주의사항을 입력해주세요."
            onChange={(e) => setWantedCaution(e.target.value)}
            value={wantedCaution}
          ></textarea>
        </Section>

        <ButtonPrimary onClick={putWanted}>수정하기</ButtonPrimary>
      </Form>
      <ToastContainer position="top-right" delay={3000} />
    </div>
  );
};

export default WantedEdit;

const Section = styled.section`
  padding: 20px 0 40px;
  margin: 20px 0;
  border-bottom: 1px solid var(--gray-200);
`;

const Form = styled.div`
  padding-bottom: 80px;
`;

const DogSelect = styled.ul`
  padding: 2px 0 5px;
  li {
    display: inline-block;
    margin: 0px 10px 9px 0;
  }

  .active {
    span {
      background: var(--primary);
      color: var(--white-000);
      margin: 3px;
    }
  }

  .no-select {
    span {
      background: var(--white-000);
      color: var(--primary);
      margin: 3px;
    }
  }
`;

const ConCheckList = styled.ul`
  li {
    position: relative;
    font-size: 15px;
    line-height: 1.3em;
    padding: 2px 0 5px;
    > label {
      display: flex;
      align-items: center;
      width: 98%;
      justify-content: space-between;
      > span {
        display: flex;
        align-items: center;
        > span:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
  }
  li + li {
    margin: 6px 0;
  }
  li:before {
    content: "";
    position: absolute;
    margin-left: -30px;
    display: inline-block;
    width: 23px;
    height: 24px;
  }
`;

const ChackEntryInput = styled.div`
  position: relative;
  textarea {
    padding-right: 66px !important;
  }
  small {
    cursor: pointer;
    position: absolute;
    display: inline-block;
    border-radius: 8px;
    padding: 13px 10px;
    bottom: 10px;
    right: 10px;
    color: var(--primary);
    font-weight: 800;
    font-size: 14px;
  }

  small:hover {
    background-color: var(--gray-100);
  }
`;

const DogCheckBox = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--primary);
  }
`;

const DogCheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;

  > span {
    display: flex;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.13);
    padding: 4px 14px 4px 5px;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid var(--gray-200);
    border-radius: 50px;
    min-width: 110px;
    > img {
      border-radius: 30px;
      width: 35px;
      height: 35px;
      margin-right: 5px;
    }
  }
`;

const Error = styled.span`
  display: block;
  font-size: 12px;
  color: var(--err-danger);
  text-align: right;
  margin-left: 10px;
`;
