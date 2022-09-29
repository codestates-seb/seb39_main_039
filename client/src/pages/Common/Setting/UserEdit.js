import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header } from "../../../components/Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ButtonPrimary } from "../../../components/Button/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, editUserInfo } from "../../../redux/actions/userActions";
import { ToastContainer } from "react-toast";
import noImage from "../../../assets/img/noImage.svg";

const UserEdit = () => {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(userInfo.fullName);
  const [phone, setPhone] = useState(userInfo.phone);
  const [nickName, setNickName] = useState(userInfo.nickName);

  const ClickHandler = () => {
    dispatch(editUserInfo(fullName, phone, nickName));
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, [loading]);

  return (
    <div className="container v2">
      <Header pageTitle={"나의 기본정보 수정"} />
      <UserInfo>
        <div className="user-con">
          <UserPhoto>
            <img src={userInfo.profileImage} className="user-photo" alt="" />
            <Link to="/" className="user-edit">
              <FontAwesomeIcon icon={faCamera} />
            </Link>
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div className="ipt-group">
          <label htmlFor="phone" className="ipt-label">
            휴대폰 번호
          </label>
          <input
            type="text"
            name="phone"
            className="ipt-form"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="연락처를 입력해주세요."
          />
        </div>
        <div className="ipt-group">
          <label htmlFor="email" className="ipt-label">
            이메일
          </label>
          <input
            type="email"
            name="email"
            className="ipt-form"
            value={userInfo.email}
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
            value={nickName}
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

const Form = styled.div``;

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
