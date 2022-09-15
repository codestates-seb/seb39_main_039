import { Link } from "react-router-dom";
import styled from "styled-components"
import noImage from '../../../assets/img/noImage.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import UserGrade from "../../../components/UserGrade";
import Arrows from '../../../assets/img/arrows.svg';

const Setting = () => {
    return(
        <div className="container">
            <PageSummary>전체</PageSummary>
            <UserInfo>
                <div className="user-con">
                    <UserPhoto>
                        <img src={noImage} className="user-photo" alt=""/>
                        <Link to="/" className="user-edit"><FontAwesomeIcon icon={faPen}/></Link>
                    </UserPhoto>
                    <p className="user-name">사용자이름</p>
                    <em className="user-phone">010-1234-1234</em>
                    <p className="user-email">user@email.com</p>
                </div>
                <UserGrade className="user-grade" />
            </UserInfo>

            <List>
                <li>
                    <p>화면모드</p>
                    <div></div>
                </li>
                <li>
                    <p>내 정보 수정</p>
                    <div></div>
                </li>
                <li>
                    <p>강아지 정보 수정</p>
                    <div className="opt-info">3마리</div>
                </li>
                <li>
                    <p>알바 정보 수정</p>
                </li>
                <li>
                    <p>내 체크리스트 템플릿</p>
                </li>
                <li>
                    <p>구인글 리스트</p>
                </li>
            </List>
        </div>
    )
}

export default Setting

const PageSummary = styled.h3`
    padding-top:20px;
    font-size:20px;
    font-weight: 500;
    line-height: 1.4em;
`

const UserInfo = styled.section`
    text-align: center;
    border-bottom:1px solid var(--gray-200);
    padding:10px 0 35px;

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
        padding:15px 0;
        margin:5px 0;
        background-repeat: no-repeat;
        background-position:98% 50%;
        background-image:url('${Arrows}');

        .opt-info{
            padding-right:40px;
            font-size:13px;
        }
    }
`