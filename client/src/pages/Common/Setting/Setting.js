import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import noImage from '../../../assets/img/noImage.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import UserGrade from "../../../components/UserGrade";
import Arrows from '../../../assets/img/arrows.svg';
import SwitchMode from "../../../components/SwitchMode";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/actions/userActions";

const Setting = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    const [isOn, setIsOn]= useState(true);
    const toggleHandler = () => {
        setIsOn(!isOn)
    }

    return(
        <div className="container">
            <PageSummary><h2>전체</h2> <small>로그아웃</small></PageSummary>
            <UserInfo>
                <div className="user-con">
                    <UserPhoto>
                        <img src={userInfo.profileImage} className="user-photo" alt=""/>
                        <Link to="/userEdit" className="user-edit"><FontAwesomeIcon icon={faPen}/></Link>
                    </UserPhoto>
                    <p className="user-name">{userInfo.nickName}</p>
                    <em className="user-phone">{userInfo.phone}</em>
                    <p className="user-email">{userInfo.email}</p>
                </div>
                <UserGrade className="user-grade" />
            </UserInfo>

            <List>
                <li>
                    <p>화면모드</p>
                    <div className="opt-info v2">
                        <SwitchMode isOn={isOn} toggleHandler={toggleHandler}/>
                    </div>
                </li>
                <li>
                    <p><Link to='/UserEdit'>내 정보 수정</Link></p>
                    <div></div>
                </li>
                <li>
                    <p><Link to='/DogEdit'>강아지 정보 수정</Link></p>
                    <div className="opt-info">3마리</div>
                </li>
                <li>
                    <p><Link to='/WalkerEdit'>알바 정보 수정</Link></p>
                </li>
                <li>
                    <p>내 체크리스트 템플릿</p>
                </li>
                <li>
                    <p><Link to='/WantedList'>구인글 리스트</Link></p>
                </li>
            </List>
        </div>
    )
}

export default Setting

const PageSummary = styled.h3`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top:20px;
    font-size:20px;
    font-weight: 500;
    line-height: 1.4em;
    
    small {
        display: inline-block;
        font-size:12px;
        color:var(--gray-500);
        background-color:var(--gray-050);
        padding:0 8px;
        border-radius: 5px;
    }
`

const UserInfo = styled.section`
    text-align: center;
    border-bottom:1px solid var(--gray-200);
    padding:10px 0 30px;

    .user-name{
        font-size:24px;
        font-weight: 800;
    }
    .user-phone{
        display: inline-block;
        font-size:13px;
        font-weight: 500;
        color:var(--gray-700);
        background:var(--gray-100);
        border:1px solid var(--gray-200);
        border-radius: 6px;
        padding:5px 7px;
        margin:10px 0 6px;
    }
    .user-email{
        font-size:16px;
        color:var(--gray-500);
        letter-spacing:0;
    }

    .user-con{margin-bottom:16px}
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

const List = styled.ul`
    margin:10px 0;
    font-weight: 500;

    li{
        display: flex;
        justify-content: space-between;
        position:relative;
        padding:15px 0;
        margin:5px 0;
        background-repeat: no-repeat;
        background-position:98% 50%;
        background-image:url('${Arrows}');

        p a{
            color:var(--black-900)
        }
        .opt-info{
            padding-right:40px;
            font-size:13px;
        }

        .opt-info.v2{
            position:absolute;
            right:0;
            top:50%;
            padding-right:0;
            transform: translate(0, -50%);
        }
    }
`