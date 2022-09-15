import styled from "styled-components";
import { Link } from "react-router-dom";
import { HeaderConfirm } from "../../../components/Layout/Header";
import noImage from '../../../assets/img/noImage.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const UserEdit = () => {
    const ClickHandler = () =>{
        console.log('확인');
    }
    return(
        <div className="container">
            <HeaderConfirm pageTitle={'나의 기본정보 수정'} ConfirmName={'확인'} ClickHandler={ClickHandler}/>
            <UserInfo>
                <div className="user-con">
                    <UserPhoto>
                        <img src={noImage} className="user-photo" alt=""/>
                        <Link to="/" className="user-edit"><FontAwesomeIcon icon={faCamera}/></Link>
                    </UserPhoto>
                </div>
            </UserInfo>
            <Form>
                <div className="ipt-group">
                    <label htmlFor="name" className="ipt-label">이름</label>
                    <input type="text" name="name" className="ipt-form" placeholder="이름을 입력해주세요." />
                </div>
                <div className="ipt-group">
                    <label htmlFor="phone" className="ipt-label">휴대폰 번호</label>
                    <input type="number" name="phone" className="ipt-form" placeholder="연락처를 입력해주세요."/>
                </div>
                <div className="ipt-group">
                    <label htmlFor="email" className="ipt-label">이메일</label>
                    <input type="email" name="email" className="ipt-form" value={'alba@gmail.com'} disabled/>
                </div>
                <div className="ipt-group">
                    <label htmlFor="nickname" className="ipt-label">닉네임</label>
                    <input type="text" name="nickname" className="ipt-form" placeholder="닉네임을 입력해주세요."/>
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