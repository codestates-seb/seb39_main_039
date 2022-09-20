import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header } from "../../../components/Layout/Header";
import noImage from '../../../assets/img/noImage.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ButtonPrimary } from "../../../components/Button/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../../hooks/useInput";
import { getUserInfo, editUserInfo } from "../../../redux/actions/userActions";

const UserEdit = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getUserInfo());
    }, []);
    const [state, setState] = useInput({
        fullName: `${userInfo.fullName}`,
        phone: `${userInfo.phone}`,
        nickName:`${userInfo.nickName}`,
        email:`${userInfo.email}`,
      });
    const { fullName, phone, nickName } = state;
    
    const ClickHandler = () =>{
        dispatch(editUserInfo(fullName, phone, nickName));
    }


    return(
        <div className="container">
            <Header pageTitle={'나의 기본정보 수정'}/>
            <UserInfo>
                <div className="user-con">
                    <UserPhoto>
                        <img src={userInfo.profileImage} className="user-photo" alt=""/>
                        <Link to="/" className="user-edit"><FontAwesomeIcon icon={faCamera}/></Link>
                    </UserPhoto>
                </div>
            </UserInfo>
            <Form>
                <div className="ipt-group">
                    <label htmlFor="fullName" className="ipt-label">이름</label>
                    <input 
                        type="text" 
                        className="ipt-form"
                        name="fullName"
                        value={fullName}
                        onChange={setState}
                        placeholder="이름을 입력해주세요."/>
                </div>
                <div className="ipt-group">
                    <label htmlFor="phone" className="ipt-label">휴대폰 번호</label>
                    <input 
                        type="text" 
                        name="phone" 
                        className="ipt-form" 
                        value={phone}
                        onChange={setState}
                        placeholder="연락처를 입력해주세요."/>
                </div>
                <div className="ipt-group">
                    <label htmlFor="email" className="ipt-label">이메일</label>
                    <input type="email" name="email" className="ipt-form" value={userInfo.email} disabled/>
                </div>
                <div className="ipt-group">
                    <label htmlFor="nickName" className="ipt-label">닉네임</label>
                    <input 
                        type="text" 
                        name="nickName" 
                        className="ipt-form" 
                        value={nickName}
                        onChange={setState}
                        placeholder="닉네임을 입력해주세요."/>
                </div>

                <div className="btn-area">
                    <ButtonPrimary onClick={ClickHandler}>수정 완료</ButtonPrimary>
                </div>
            </Form>
        </div>
    )
}

export default UserEdit

const Form = styled.div`

`

const UserInfo = styled.section`
    text-align: center;
    padding:10px 0 3px;
`

const UserPhoto = styled.div`
    display: inline-block;
    position:relative;
    margin-bottom:13px;

    .user-photo{
        width:100px;
        height:100px;
        border-radius: 100px;
    }
    
    .user-edit{
        position:absolute;
        right:-7px;
        bottom:-3px;
        display: flex;
        justify-content: center;
        align-items: center;
        width:35px;
        height:35px;
        background:var(--gray-100);
        border:3px solid var(--white-000);
        box-shadow: 0 0 15px 0 rgba(0,0,0, .1);
        border-radius: 50%;

        svg{
            color:var(--gray-800)
        }
    }
`