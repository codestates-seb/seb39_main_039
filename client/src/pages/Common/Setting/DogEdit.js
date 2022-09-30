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
  deleteMyPetInfo,
  savePetPicture
} from "../../../redux/actions/petActions";
import { petSpecList } from "../../../constants/petSpecies";
import {
  ButtonPrimary,
  ButtonCancel
} from "../../../components/Button/Buttons";
import { ToastContainer } from "react-toast";
import { ThreeDots } from "react-loader-spinner";

const DogEdit = () => {
  const imgRef = useRef();
  const sexRef = useRef();
  const specRef = useRef();
  const birthRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myPetInfo, loading } = useSelector((state) => state.pet);

  const petSexList = ["수컷", "암컷"];

  let tabListUrl = useLocation().search;
  let tabList = tabListUrl.slice(-1);

  localStorage.setItem("tabList", tabList);
  let tab = localStorage.getItem("tabList");

  // 초기값 설정 및 달력에서 픽 하면 값 변경.. Wed Dec 09 2020 09:00:00 GMT+0900 (한국 표준시)

  const [myPetSex, setMyPetSex] = useState(myPetInfo[tab]?.sex);
  const [myPetSpecies, setMyPetSpecies] = useState(myPetInfo[tab]?.species);
  const [myPetName, setMyPetName] = useState(myPetInfo[tab]?.petName);
  const [myPetAbout, setMyPetAbout] = useState(myPetInfo[tab]?.aboutPet);
  const [myPetBirth, setMyPetBirth] = useState(
    new Date(myPetInfo[tab]?.birthday)
  );
  const [convertMyPetBirth, setConvertMyPetBirth] = useState("");
  const [myPetPicture, setMyPetPicture] = useState(myPetInfo[tab]?.petPicture);
  // GMT로 변환하기 위해서 2022-11-04 -> 2022,11,04로 만들었다.
  const [imageUrl, setImageUrl] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const menuArr = myPetInfo.map((el) => el);

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  const selectMenuHandler = (tab) => {
    navigate(`/dogEdit?tab=${tab}`);
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
        myPetName,
        myPetSpecies,
        convertMyPetBirth,
        myPetSex,
        myPetAbout
      )
    );
    dispatch(savePetPicture(myPetInfo[tab].petId, imgFile));
  };

  const deletePet = () => {
    dispatch(deleteMyPetInfo(myPetInfo[tab].petId));
  };

  const onClickFileBtn = (e) => {
    imgRef.current.click();
  };

  useEffect(() => {
    setMyPetSpecies(myPetInfo[tab].species);
    setMyPetBirth(new Date(myPetInfo[tab]?.birthday));
    setMyPetSex(myPetInfo[tab]?.sex);
    setMyPetPicture(myPetInfo[tab]?.petPicture);
    setImageUrl(null);
    setImgFile(null);
    imgRef.current.value = null;
  }, [tab]);

  useEffect(() => {
    tab && dispatch(getMyPetInfo());
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
        navigate(`/dogEditAdd`)
      ) : (
        <>
          <TabMenu>
            {menuArr.map((el, index) => {
              return (
                <li
                  className={`${index == tab ? "submenu focused" : "submenu"}`}
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
          {loading ? (
            <Loading>
              <ThreeDots color="#3183f8" height={80} width={80} />
            </Loading>
          ) : (
            <>
              <Desc>
                <UserInfo>
                  <div className="user-con">
                    <UserPhoto>
                      <img
                        src={imageUrl ? imageUrl : myPetPicture}
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
                      value={tab && myPetName}
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
                      value={tab && myPetSpecies}
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
                      selected={myPetBirth}
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
                      value={tab && myPetSex}
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
            </>
          )}
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
