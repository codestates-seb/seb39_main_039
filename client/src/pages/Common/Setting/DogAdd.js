import styled from "styled-components"
import { Link } from "react-router-dom";
import { Header } from "../../../components/Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import anonymousDog from '../../../assets/img/anonymousDog.svg';
import { ButtonPrimary } from "../../../components/Button/Buttons";

const DogAdd = () => {

    return(
        <div className="container">
            <Header pageTitle={'강아지 등록'}/>
            <UserInfo>
                <div className="user-con">
                    <UserPhoto>
                        <img src={anonymousDog} className="user-photo" alt=""/>
                        <Link to="/" className="user-edit"><FontAwesomeIcon icon={faCamera}/></Link>
                    </UserPhoto>
                </div>
            </UserInfo>
            <Form>
                <div className="ipt-group">
                    <label htmlFor="name" className="ipt-label">강아지 이름</label>
                    <input type="text" name="name" className="ipt-form" placeholder="강아지 이름을 입력해주세요." />
                </div>
                <div className="ipt-group">
                    <label htmlFor="phone" className="ipt-label">강아지 종</label>
                    <select className="ipt-form">
                        <option>강아지 견종을 선택하세요.</option>
                        <option>시바견</option>
                        <option>시바견</option>
                    </select>
                </div>
                <div className="ipt-group">
                    <label htmlFor="" className="ipt-label">강아지 생년월일</label>
                    <input type="email" name="" className="ipt-form" />
                </div>
                <div className="ipt-group">
                    <label htmlFor="" className="ipt-label">강아지 성별</label>
                    <select className="ipt-form">
                        <option selected>수컷</option>
                        <option>암컷</option>
                    </select>
                </div>
                <div className="ipt-group">
                    <label htmlFor="" className="ipt-label">소개글</label>
                    <textarea name="" id="" className="ipt-form" placeholder="강아지 상세 소개글을 입력해주세요."></textarea>
                </div>

                <ButtonPrimary>강아지 등록</ButtonPrimary>
            </Form>
        </div>
    )
}

export default DogAdd

const Form = styled.div`
    padding-bottom:60px;
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