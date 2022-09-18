import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header } from "../../../components/Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import anonymousDog from "../../../assets/img/anonymousDog.svg";
import { ButtonPrimary } from "../../../components/Button/Buttons";
import DatePicker from "react-datepicker";
import { DATE_FORMAT_CALENDAR } from "../../../assets/style/dateFormat";
import { ko } from "date-fns/esm/locale";
import { useDispatch } from "react-redux";
import { addMyPet } from "../../../redux/actions/petActions";

const DogAdd = () => {
  const [startDate, setStartDate] = useState(new Date());
  const petSpecList = [
    "그레이 하운드",
    "그레이트 데인",
    "그레이트 피레니즈",
    "닥스훈트",
    "달마티안",
    "도베르만 핀셔",
    "독일 스피츠",
    "라사압소",
    "래브라도 리트리버",
    "레케노아",
    "마스티프",
    "말리노이즈",
    "말티즈",
    "미니어처 슈나우저",
    "미니어처 핀셔",
    "벨지안 십도그",
    "보더콜리",
    "보스턴 테리어",
    "복서",
    "불 테리어",
    "불마스티프",
    "브뤼셀 그리펀",
    "블러드하운드",
    "비글",
    "비숑프리제",
    "사모예드",
    "삽살개",
    "스키퍼키",
    "스피츠",
    "시바견",
    "시베리안 허스키",
    "시츄",
    "아키타견",
    "오스트레일리안 실키 테리어",
    "요크셔 테리어",
    "웰시코기",
    "일본 스피츠",
    "잉글리시 코커 스패니얼",
    "자이언트 푸들",
    "잭 러셀 테리어",
    "저먼 셰퍼드",
    "진돗개",
    "차우차우",
    "체서피크 베이 리트리버",
    "치와와",
    "캉갈",
    "컬리 코티드 리트리버",
    "테뷰런",
    "토이 푸들",
    "티베탄 마스티프",
    "티베탄 테리어",
    "퍼그",
    "포메라니안",
    "푸들",
    "풍산개",
    "프렌치 불도그",
    "플랫 코티드 리트리버",
    "핏불 테리어",
    "기타"
  ];

  const name = useRef();
  const about = useRef();
  const sex = useRef();
  const spec = useRef();

  const dispatch = useDispatch();

  // 날짜 형식 수정 yyyy-mm-dd
  let year = startDate.getFullYear();
  let month = ("0" + (startDate.getMonth() + 1)).slice(-2);
  let day = ("0" + startDate.getDate()).slice(-2);
  let birthOfPet = `${year}-${month}-${day}`;

  const addPet = () => {
    dispatch(
      addMyPet(
        name.current.value,
        spec.current.value,
        birthOfPet,
        sex.current.value,
        about.current.value
      )
    );
  };

  return (
    <div className="container">
      <Header pageTitle={"강아지 등록"} />
      <UserInfo>
        <div className="user-con">
          <UserPhoto>
            <img src={anonymousDog} className="user-photo" alt="" />
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
            placeholder="강아지 이름을 입력해주세요."
            ref={name}
          />
        </div>
        <div className="ipt-group">
          <label htmlFor="phone" className="ipt-label">
            강아지 종
          </label>
          <select className="ipt-form" ref={spec}>
            <option>강아지 견종을 선택하세요.</option>
            {petSpecList.map((el) => (
              <option>{el}</option>
            ))}
          </select>
        </div>
        <div className="ipt-group">
          <label htmlFor="" className="ipt-label">
            강아지 생년월일
          </label>
          <DatePicker
            locale={ko}
            dateFormat="yyyy년 MM월 dd일 생"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormatCalendar={DATE_FORMAT_CALENDAR}
            maxDate={new Date()}
            setDate={birthOfPet}
          />
        </div>
        <div className="ipt-group">
          <label htmlFor="" className="ipt-label">
            강아지 성별
          </label>
          <select className="ipt-form" ref={sex}>
            <option value={"M"}>수컷</option>
            <option value={"F"}>암컷</option>
          </select>
        </div>
        <div className="ipt-group">
          <label htmlFor="" className="ipt-label">
            소개글
          </label>
          <textarea
            name=""
            id=""
            className="ipt-form"
            placeholder="강아지 상세 소개글을 입력해주세요."
            ref={about}
          ></textarea>
        </div>

        <ButtonPrimary onClick={addPet}>강아지 등록</ButtonPrimary>
      </Form>
    </div>
  );
};

export default DogAdd;

const Form = styled.div`
  padding-bottom: 60px;
`;

const UserInfo = styled.section`
  text-align: center;
  padding: 10px 0 3px;
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
