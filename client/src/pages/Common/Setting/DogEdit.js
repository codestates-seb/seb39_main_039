import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components/Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import {
  DogNameLabelType2,
  AnonymousLabelType2
} from "../../../components/DogNameLabel";
import DatePicker from "react-datepicker";
import { DATE_FORMAT_CALENDAR } from "../../../assets/style/dateFormat";
import { ko } from "date-fns/esm/locale";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPetInfo,
  editMyPetInfo,
  deleteMyPetInfo
} from "../../../redux/actions/petActions";
import { petSpecList } from "../../../constants/petSpecies";
import {
  ButtonPrimary,
  ButtonCancel
} from "../../../components/Button/Buttons";
import { ToastContainer } from "react-toast";

const DogEdit = () => {
  const sex = useRef();
  const spec = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myPetInfo, loading } = useSelector((state) => state.pet);

  let tapListUrl = useLocation().search;
  let tapList = tapListUrl.slice(-1);

  const [currentTab, setCurrentTab] = useState(0);

  const [birth, setBirth] = useState(
    new Date(myPetInfo[tapList]?.birthday.split("-").join(","))
  );
  // 초기값 설정 및 달력에서 픽 하면 값 변경.. Wed Dec 09 2020 09:00:00 GMT+0900 (한국 표준시)

  const [myPetName, setMyPetName] = useState(myPetInfo[tapList]?.petName);
  const [myPetAbout, setMyPetAbout] = useState(myPetInfo[tapList]?.aboutPet);
  const [myPetBirth, setMyPetBirth] = useState(myPetInfo[tapList]?.birthday);
  // GMT로 변환하기 위해서 2022-11-04 -> 2022,11,04로 만들었다.

  const ClickHandler = () => {
    dispatch(
      editMyPetInfo(
        myPetInfo[currentTab].petId,
        myPetName,
        spec.current?.value,
        myPetBirth,
        sex.current?.value,
        myPetAbout
      )
    );
  };

  const deletePet = () => {
    dispatch(deleteMyPetInfo(myPetInfo[currentTab].petId));
  };

  const menuArr = myPetInfo.map((el) => el);

  const selectMenuHandler = (tab) => {
    setCurrentTab(tab);
    navigate(`/dogEdit?tap=${tab}`);
  };

  const birthPick = (data) => {
    let year = new Date(data).getFullYear();
    let month = new Date(data).getMonth() + 1;
    let day = new Date(data).getDate();

    if (month < 10) {
      month = `0` + String(month);
    }

    if (day < 10) {
      day = `0` + String(day);
    }

    setMyPetBirth(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    dispatch(getMyPetInfo());
    navigate(`/dogEdit?tap=${tapList}`);
    setCurrentTab(tapList);
    console.log(myPetName, myPetAbout);
  }, [loading]);

  useEffect(() => {
    dispatch(getMyPetInfo());
  }, [currentTab, tapList, myPetBirth]);

  useEffect(() => {
    setBirth(new Date(myPetInfo[tapList]?.birthday.split("-").join(",")));
  }, [currentTab]);

  return (
    <div className="container">
      <Header pageTitle={"강아지 정보 수정"} link={'/setting'} />
      <TabMenu>
        {menuArr.map((el, index) => {
          return (
            <li
              className={`${
                index == currentTab ? "submenu focused" : "submenu"
              }`}
              onClick={() => {
                selectMenuHandler(index);
                setMyPetName(el.petName);
                setMyPetAbout(el.aboutPet);
              }}
              key={index}
            >
              <DogNameLabelType2
                name={el.petName}
                picture={el.petPicture}
                key={index}
              />
            </li>
          );
        })}
        <li>
          <Link to="/dogAdd">
            <AnonymousLabelType2 />
          </Link>
        </li>
      </TabMenu>

      <Desc>
        <UserInfo>
          <div className="user-con">
            <UserPhoto>
              <img
                src={menuArr[currentTab]?.petPicture}
                className="user-photo"
                alt=""
              />
              <Link to="/" className="user-edit">
                <FontAwesomeIcon icon={faCamera} />
              </Link>
            </UserPhoto>
          </div>
        </UserInfo>
        <Form>
          <div className="ipt-group">
            <label htmlFor="name" className="ipt-label">
              강아지 이름
            </label>
            <input
              type="text"
              name="name"
              className="ipt-form"
              onChange={(e) => setMyPetName(e.target.value)}
              value={myPetName}
            />
          </div>
          <div className="ipt-group">
            <label htmlFor="phone" className="ipt-label">
              강아지 종
            </label>
            <select className="ipt-form" ref={spec}>
              <option>{myPetInfo[currentTab]?.species}</option>
              {petSpecList.map((el, idx) => (
                <option key={idx}>{el}</option>
              ))}
            </select>
          </div>
          <div className="ipt-group">
            <label htmlFor="" className="ipt-label">
              강아지 생년월일
            </label>
            <DatePicker
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale={ko}
              dateFormat="yyyy년 MM월 dd일 생"
              setDate="today"
              selected={birth}
              onChange={(date) => {
                setBirth(date);
                birthPick(date);
              }}
              maxDate={new Date()}
              dateFormatCalendar={DATE_FORMAT_CALENDAR}
            />
          </div>
          <div className="ipt-group">
            <label htmlFor="" className="ipt-label">
              강아지 성별
            </label>
            <select className="ipt-form" ref={sex}>
              {myPetInfo[currentTab]?.sex === "수컷" ? (
                <>
                  <option selected>{myPetInfo[currentTab]?.sex}</option>
                  <option value={"암컷"}>암컷</option>
                </>
              ) : (
                <>
                  <option selected>{myPetInfo[currentTab]?.sex}</option>
                  <option value={"수컷"}>수컷</option>
                </>
              )}
            </select>
          </div>
          <div className="ipt-group">
            <label htmlFor="about" className="ipt-label">
              소개글
            </label>
            <textarea
              name="about"
              type="text"
              className="ipt-form"
              onChange={(e) => {
                setMyPetAbout(e.target.value);
              }}
              value={myPetAbout}
            ></textarea>
          </div>

          <div className="btn-area">
            <ButtonPrimary onClick={ClickHandler}>
              {loading ? "..." : "수정 완료"}
            </ButtonPrimary>
            <ButtonCancel onClick={deletePet}>삭제</ButtonCancel>
          </div>
        </Form>
      </Desc>
      <ToastContainer position="top-right" delay={3000} />
    </div>
  );
};

export default DogEdit;
const Form = styled.div`
  padding-bottom: 60px;

  .btn-area {
    button + button {
      margin-top: 10px;
    }
  }
`;

const UserInfo = styled.section`
  text-align: center;
  padding: 10px 0 3px;
`;

const TabMenu = styled.ul`
  font-weight: bold;
  overflow: auto;
  white-space: nowrap;
  margin: 0 -20px;
  padding: 10px 15px 12px;
  border-bottom: 1px solid var(--gray-200);

  li {
    position: relative;
    display: inline-block;
    margin-right: 9px;
  }

  .focused {
    span {
      background: var(--primary);
      color: var(--white-000);
    }
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
  border-top: 7px solid var(--gray-100);
  margin: 0 -20px;
  padding: 20px;
`;

const UserPhoto = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 13px;

  .user-photo {
    width: 100px;
    height: 100px;
    border-radius: 100px;
  }

  .user-edit {
    position: absolute;
    right: -7px;
    bottom: -3px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background: var(--gray-100);
    border: 3px solid var(--white-000);
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    border-radius: 50%;

    svg {
      color: var(--gray-800);
    }
  }
`;
