import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ButtonPrimary } from "../../../components/Button/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, editUserInfo } from "../../../redux/actions/userActions";
import { saveUserPicture, delUserPicture } from "../../../redux/actions/userActions";
import { ToastContainer } from "react-toast";
import ModalOption from "../../../components/Modal/ModalOption";
import noImage from '../../../assets/img/noImage.svg'

const UserEdit = () => {
  const dispatch = useDispatch();
  const imgRef = useRef();

  const { userInfo, loading, stateCode } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(userInfo?.fullName);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [nickName, setNickName] = useState(userInfo.nickName);
  const [myPetPicture, setMyPetPicture] = useState(userInfo.profileImage);
  const [imageUrl, setImageUrl] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [err, setErr] = useState();


  // useEffect(() => {
  //   if (phone.length === 11) {
  //     setPhone({
  //       phone: phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
  //     });
  //   } else if (phone.length === 13) {
  //     setPhone({
  //       phone: phone
  //       //하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
  //         .replace(/-/g, '')
  //         .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
  //     });
  //   }
  // }, [phone]);

  useEffect(()=>{
    if(stateCode.stateCode === 400){
      setErr('이름과 휴대폰번호를 모두 입력해주세요.')
    }else{
      setErr();
    }
  },[stateCode])

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const ClickHandler = () => {
    dispatch(editUserInfo(fullName, phone, nickName));
    dispatch(saveUserPicture(imgFile));
    setErr();
  };

  useEffect(() => {
    dispatch(getUserInfo());
    if (window) window.scrollTo(0, 0);
  }, [loading]);


  const onClickFileBtn = (e) => {
    setIsOpen(true);
  };

  const uploadHandler =() =>{
    imgRef.current.click();
    setIsOpen(false);
  }

  const profileDeleteHandler =() =>{
    dispatch(delUserPicture());
    setMyPetPicture(noImage);
    setIsOpen(false);
  }
  
  const onChangeImage = () => {
    setImgFile(imgRef.current.files[0]);
    setImageUrl(URL.createObjectURL(imgRef.current.files[0]));
    window.URL.revokeObjectURL(imgRef.current.files[0]);
  };

  return (
    <div className="container v2">
      <ModalOption 
        isOpen={isOpen} 
        uploadHandler={uploadHandler}
        profileDeleteHandler={profileDeleteHandler}
        openModalHandler={openModalHandler}
      />
      <Header pageTitle={"나의 기본정보 수정"} />
      <UserInfo>
        <div className="user-con">
          <UserPhoto>
            <img 
              src={imageUrl ? imageUrl : myPetPicture || userInfo.profileImage}
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
          <label htmlFor="fullName" className="ipt-label">
            이름
          </label>
          <input
            type="text"
            className="ipt-form"
            name="fullName"
            value={fullName||''}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="이름을 입력해주세요."
          />
          <small className="err">{err}</small>
        </div>
        <div className="ipt-group">
          <label htmlFor="phone" className="ipt-label">
            휴대폰 번호
          </label>
          <input
            type="text"
            name="phone"
            className="ipt-form"
            value={phone||''}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="연락처를 입력해주세요."
          />
          <small className="err">{err}</small>
        </div>
        <div className="ipt-group">
          <label htmlFor="email" className="ipt-label">
            이메일
          </label>
          <input
            type="email"
            name="email"
            className="ipt-form"
            value={userInfo.email||''}
            disabled
          />
        </div>
        <div className="ipt-group">
          <label htmlFor="nickName" className="ipt-label">
            닉네임
          </label>
          <input
            type="text"
            name="nickName"
            className="ipt-form"
            value={nickName||''}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="닉네임을 입력해주세요."
          />
        </div>

        <div className="btn-area">
          <ButtonPrimary onClick={ClickHandler}>수정 완료</ButtonPrimary>
        </div>
      </Form>
      <ToastContainer position="top-right" delay={3000} />
    </div>
  );
};

export default UserEdit;

const Form = styled.div`
  .err{
    display: inline-block;
    font-size:12px;
    margin-top:4px;
    color:var(--err-danger);
  }
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
