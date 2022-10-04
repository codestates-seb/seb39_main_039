import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components/Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import {
  DogNameLabelType2,
  AnonymousLabelType2,
} from "../../../components/DogNameLabel";
import DatePicker from "react-datepicker";
import { DATE_FORMAT_CALENDAR } from "../../../assets/style/dateFormat";
import { ko } from "date-fns/esm/locale";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPetInfo,
  editMyPetInfo,
  deleteMyPetInfo,
  savePetPicture,
} from "../../../redux/actions/petActions";
import { petSpecList } from "../../../constants/petSpecies";
import {
  ButtonPrimary,
  ButtonCancel,
  ButtonPrimaryXS,
} from "../../../components/Button/Buttons";
import { ToastContainer } from "react-toast";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment/moment";
import dogIcon from "../../../assets/img/dog-detective.png";
import dogItemIcon from "../../../assets/img/dog-detective-item.png";

const DogEdit = () => {
  const imgRef = useRef();
  const sexRef = useRef();
  const specRef = useRef();
  const birthRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myPetInfo, loading } = useSelector((state) => state.pet);
  // 초기값 설정 및 달력에서 픽 하면 값 변경.. Wed Dec 09 2020 09:00:00 GMT+0900 (한국 표준시)

  const [myPetSex, setMyPetSex] = useState();
  const [myPetSpecies, setMyPetSpecies] = useState();
  const [myPetName, setMyPetName] = useState();
  const [myPetAbout, setMyPetAbout] = useState();
  const [myPetBirth, setMyPetBirth] = useState(null);
  const [convertMyPetBirth, setConvertMyPetBirth] = useState("");
  const [myPetPicture, setMyPetPicture] = useState();
  // GMT로 변환하기 위해서 2022-11-04 -> 2022,11,04로 만들었다.
  const [imageUrl, setImageUrl] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [tab, setTab] = useState(0);
  const menuArr = myPetInfo.map((el) => el);
  const petSexList = ["수컷", "암컷"];

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const selectMenuHandler = (tab) => {
    setTab(tab);
  };

  const birthPick = (data) => {
    let year = new Date(data)?.getFullYear();
    let month = new Date(data)?.getMonth() + 1;
    let day = new Date(data)?.getDate();
    if (month < 10) {
      month = `0` + String(month);
    }
    if (day < 10) {
      day = `0` + String(day);
    }
    setConvertMyPetBirth(`${year}-${month}-${day}`);
  };

  const onChangeImage = () => {
    // const reader = new FileReader();
    setImgFile(imgRef.current.files[0]); // -> put 요청
    // reader.readAsDataURL(imgFile);
    // reader.onloadend = () => {
    setImageUrl(URL.createObjectURL(imgRef.current.files[0]));
    // };
    window.URL.revokeObjectURL(imgRef.current.files[0]);
  };

  const ClickHandler = () => {
    dispatch(
      editMyPetInfo(
        myPetInfo[tab].petId,
        myPetName || myPetInfo[tab].petName,
        myPetSpecies || myPetInfo[tab].species,
        convertMyPetBirth || myPetInfo[tab].birthday,
        myPetSex || myPetInfo[tab].sex,
        myPetAbout || myPetInfo[tab].aboutPet
      )
    );
    dispatch(savePetPicture(myPetInfo[tab].petId, imgFile));
  };

  console.log(imgFile);

  const deletePet = () => {
    dispatch(deleteMyPetInfo(myPetInfo[tab].petId));
  };

  const onClickFileBtn = (e) => {
    imgRef.current.click();
  };

  useEffect(() => {
    if (myPetInfo[tab] != null) {
      setMyPetSpecies(myPetInfo[tab]?.species);
      setMyPetName(myPetInfo[tab]?.petName);
      setMyPetAbout(myPetInfo[tab]?.aboutPet);
      setMyPetBirth(moment(myPetInfo[tab]?.birthday).toDate());
      setMyPetSex(myPetInfo[tab]?.sex);
      setMyPetPicture(myPetInfo[tab]?.petPicture);
    }
    setImageUrl(null);
    setImgFile(null);
    if (imgRef.current) imgRef.current.value = null;
  }, [tab]);

  useEffect(() => {
    dispatch(getMyPetInfo());
    if (window) window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  return (
    <div className="container v2">
      <Header pageTitle={"강아지 정보 수정"} link={"/setting"} />
      {myPetInfo.length === 0 ? (
        <div className="pg-info">
          <EmptyDataPage>
            <div className="icon-area">
              <i className="swing"></i>
            </div>
            <p>등록된 강아지가 없습니다.</p>
            <ButtonPrimaryXS>강아지 추가하러 가기</ButtonPrimaryXS>
          </EmptyDataPage>
        </div>
      ) : (
        <>
          <TabMenu>
            {menuArr.map((el, index) => {
              return (
                <li
                  className={`${index === tab ? "submenu focused" : "submenu"}`}
                  onClick={() => {
                    selectMenuHandler(index);
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
          <>
            <Desc>
              <UserInfo>
                <div className="user-con">
                  <UserPhoto>
                    <img
                      src={
                        imageUrl
                          ? imageUrl
                          : myPetPicture || myPetInfo[tab].petPicture
                      }
                      className="user-photo"
                      alt=""
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onChangeImage}
                      ref={imgRef}
                      style={{ display: "none" }}
                    />
                    <i
                      className="user-edit"
                      onClick={() => {
                        onClickFileBtn();
                      }}
                    >
                      <FontAwesomeIcon icon={faCamera} />
                    </i>
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
                    value={myPetName || myPetInfo[tab].petName}
                  />
                </div>
                <div className="ipt-group">
                  <label htmlFor="phone" className="ipt-label">
                    강아지 종
                  </label>
                  <select
                    ref={specRef}
                    name={myPetInfo[tab]?.petId}
                    className="ipt-form"
                    value={myPetSpecies || myPetInfo[tab].species}
                    onChange={(value) => setMyPetSpecies(value.target.value)}
                  >
                    {petSpecList.map((el, idx) => (
                      <option value={el} key={idx}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ipt-group">
                  <label htmlFor="" className="ipt-label">
                    강아지 생년월일
                  </label>
                  <DatePicker
                    ref={birthRef}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일 생"
                    setDate="today"
                    selected={
                      myPetBirth || moment(myPetInfo[tab]?.birthday).toDate()
                    }
                    onChange={(date) => {
                      setMyPetBirth(date);
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
                  <select
                    className="ipt-form"
                    name={myPetInfo[tab]?.petId}
                    ref={sexRef}
                    value={myPetSex || myPetInfo[tab].sex}
                    onChange={(value) => setMyPetSex(value.target.value)}
                  >
                    {petSexList.map((el, idx) => (
                      <option value={el} key={idx}>
                        {el}
                      </option>
                    ))}
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
                    value={myPetAbout || myPetInfo[tab].aboutPet}
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
          </>
        </>
      )}

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
    cursor: pointer;
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

const Loading = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const EmptyDataPage = styled.div`
  width: 100%;
  padding: 0 40px;

  p {
    padding: 0 0 15px;
    font-size: 16px;
    margin-top: 0;
  }

  .icon-area {
    position: relative;
    display: inline-block;
    width: 130px;
    height: 150px;
    margin-top: -30px;
    background-image: url("${dogIcon}");
    background-size: 100% auto;

    i {
      position: absolute;
      bottom: 18px;
      left: -10px;
      display: inline-block;
      width: 40px;
      height: 68px;
      background-image: url("${dogItemIcon}");
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
  }
  .swing {
    animation: swing ease-in-out 1s infinite alternate;
    transform-origin: center -20px;
  }
  @keyframes swing {
    0% {
      transform: rotate(3deg);
    }
    100% {
      transform: rotate(-3deg);
    }
  }
`;
