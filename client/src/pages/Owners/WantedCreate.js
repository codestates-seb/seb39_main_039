import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Layout/Header";
import {
  ButtonPrimary,
  ButtonPrimaryXS
} from "../../components/Button/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { ko } from "date-fns/esm/locale";
import { useInputAutoHeight } from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { postWanted } from "../../redux/actions/wantedActions";
import { getMyPetInfo } from "../../redux/actions/petActions";
import { nanoid } from "nanoid";
import CitySelect from "../../components/CitySelect";

const WantedCreate = () => {
  const { myPetInfo } = useSelector((state) => state.pet);
  const [wantedTitle, setWantedTitle] = useState();
  const [wantedCaution, setWantedCaution] = useState();
  const [wantedReward, setWantedReward] = useState();
  const [createError, setCreateError] = useState();
  const [isOpen, setIsOpen] = useState(false); // 지역 모달창 여닫기
  const [checkedList, setCheckedList] = useState([]);
  const [petChecked, setPetChecked] = useState([]);
  const [region, setRegion] = useState(""); //지역 id받아오는 state
  const [regionName, setRegionName] = useState(""); // 지역 이름 담기
  const [regionNamePick, setRegionNamePick] = useState("지역을 선택해주세요."); //지역이름 선택 하면! input값으로 넣기
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 30), 17)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regionRef = useRef(); //선택 후 지역 인풋 포커싱

  const cityModal = () => {
    //모달창 여닫기
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const [checklistData, setCheckListData] = useState([
    { id: nanoid(), title: "간식 먹이기 전에 훈련을 해주세요." },
    { id: nanoid(), title: "올림픽공원 산책을 해주세요." },
    { id: nanoid(), title: "가방에 있는 영양제 1포를 먹여주세요." }
  ]);

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
    checkItemEnterHandler
  ] = useInputAutoHeight("");

  let checkNum = /^[0-9]*$/;

  const addCheckList = (title) => {
    setCheckListData([...checklistData, { id: nanoid(), title: title }]);
  };

  const deleteCheckList = (id) => {
    setCheckListData(checklistData.filter((el) => el.id !== id));
  };


  const addWanted = () => {
    dispatch(
      postWanted(
        wantedCaution,
        checkedList,
        region,
        endDate,
        wantedReward,
        petChecked,
        startDate,
        wantedTitle
      )
    ).then((res) => {
      if (res.data) {
        navigate(`/wantedDetail/${res.data}`);
      } else {
        setCreateError(res);
      }
    });
  };

  useEffect(() => {
    dispatch(getMyPetInfo());
  }, []);

  const inputPriceFormat = (str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    };
    const uncomma = (str) => {
      str = String(str);
      return str.replace(/[^\d]+/g, "");
    };
    return comma(uncomma(str));
  };


  return (
    <div className="container v2">
      <Header pageTitle={"구인 글 작성"} />
      <CitySelect
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        setRegion={setRegion} 
        setRegionName={setRegionName} 
        confirmHandler={regionConfirmHandler} 
      />
      <Form>
        <Section className="pt0 pb20">
          <div className="ipt-group">
            <label htmlFor="" className="ipt-label">
              제목
            </label>
            <input
              onChange={(e) => setWantedTitle(e.target.value)}
              value={wantedTitle}
              type="text"
              className="ipt-form"
              name="username"
              placeholder="제목을 입력해주세요."
            />
            {createError && (wantedTitle?.length === 0 || !wantedTitle) && (
              <Error>제목을 입력해주세요</Error>
            )}
          </div>
          <label className="ipt-label">산책할 강아지 선택</label>
          <DogSelect>
            {myPetInfo?.map((el, idx) => (
              <li>
                <DogCheckBoxLabel htmlFor={el.petName}>
                  <DogCheckBox
                    type="checkbox"
                    name={el.petName}
                    onChange={(e) => {
                      onCheckPetElement(e.target.checked, el.petId);
                    }}
                  />
                  <span>
                    <img width={35} src={el.petPicture} />
                    <span>{el.petName}</span>
                  </span>
                </DogCheckBoxLabel>
              </li>
            ))}
            {createError && (petChecked?.length === 0 || !petChecked) && (
              <Error>강아지를 선택해주세요</Error>
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
              onChange={() => console.log()} // value써서 임시로 넣은 기능없는 onChange
              onClick={cityModal}
            />
            {createError && (region?.length === 0 || !region) && (
              <Error>지역을 선택해주세요</Error>
            )}
          </div>

          <div className="ipt-group">
            <label htmlFor="" className="ipt-label">
              산책 희망 시간
            </label>
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
                onChange={(e) =>
                  setWantedReward(inputPriceFormat(e.target.value))
                }
                value={wantedReward}
              />
              <span>원</span>
            </div>
            {createError &&
              <>
              {(wantedReward?.length === 0) || (wantedReward?.length === undefined ) ? <Error>보수를 올바르게 입력해주세요</Error> :''}
              </>
            }
          </div>
        </Section>
        <Section>
          <label className="ipt-label">체크리스트</label>
          <ConCheckList>
            {checklistData.map((el, idx) => (
              <li>
                <label htmlFor={el.title}>
                  <span>
                    <DogCheckBox
                      type="checkbox"
                      name={el.title}
                      onChange={(e) => {
                        onCheckListElement(e.target.checked, e.target.name);
                      }}
                    />
                    <span>{el.title}</span>
                  </span>
                  <span>
                    <ButtonPrimaryXS onClick={() => deleteCheckList(el.id)}>
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
          {createError && (checkedList?.length === 0 || !checkedList) && (
            <Error>체크리스트를 1개 이상 선택해주세요</Error>
          )}
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
        <ButtonPrimary onClick={addWanted}>등록하기</ButtonPrimary>
      </Form>
    </div>
  );
};

export default WantedCreate;

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
      height: 35px;
      margin-right: 5px;
    }
  }
`;

const Error = styled.div`
  font-size: 12px;
  color: var(--err-danger);
  margin-top: 7px;
  margin-right: 20px;
  text-align: end;
`;
