import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HeaderConfirm } from "../../../components/Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { DogNameLabelType2, AnonymousLabelType2 } from "../../../components/DogNameLabel";
import DatePicker from 'react-datepicker';
import { DATE_FORMAT_CALENDAR } from "../../../assets/style/dateFormat";
import { ko } from "date-fns/esm/locale";


const DogEdit = () => {
    const [startDate, setStartDate] = useState(new Date());

    const ClickHandler = () =>{
        console.log('수정 확인 함수');
    }
    const menuArr = [
        // 흠.. 탭 컨텐츠 객체인뎀.. 받아오는 데이터로 대체할 수 있을지..
        { name: 'Tab1', content: 'Tab menu ONE' },
        { name: 'Tab2', content: 'Tab menu TWO' },
        { name: 'Tab3', content: 'Tab menu THREE' },
    ];

    const [currentTab, setCurrentTab] = useState(0);

    const selectMenuHandler = (index) => {
        setCurrentTab(index)
    };

    return(
        <div className="container">
            <HeaderConfirm pageTitle={'강아지 정보 수정'} ConfirmName={'완료'} ClickHandler={ClickHandler}/>
            <TabMenu>
                {menuArr.map((li, index) => {
                return <li  
                className={`${index === currentTab ? 'submenu focused' : 'submenu'}`} 
                onClick={()=>selectMenuHandler(index)}><DogNameLabelType2 name={'춘식'} /></li>
                })}
                <li><AnonymousLabelType2 /></li>
            </TabMenu>
            

            <Desc>
                {/* <p>{menuArr[currentTab].content}</p> */}
                <UserInfo>
                    <div className="user-con">
                        <UserPhoto>
                            <img src={'https://avatars.githubusercontent.com/u/9497404?v=4'} className="user-photo" alt="" />
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
                            <option>시바견</option>
                            <option>시바견</option>
                            <option>시바견</option>
                        </select>
                    </div>
                    <div className="ipt-group">
                        <label htmlFor="" className="ipt-label">강아지 생년월일</label>
                        <DatePicker
                            locale={ko}
                            dateFormat="yyyy년 MM월 dd일 생"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormatCalendar={DATE_FORMAT_CALENDAR}
                        />
                    </div>
                    <div className="ipt-group">
                        <label htmlFor="" className="ipt-label">강아지 성별</label>
                        <select className="ipt-form">
                            <option>수컷</option>
                            <option>암컷</option>
                        </select>
                    </div>
                    <div className="ipt-group">
                        <label htmlFor="" className="ipt-label">소개글</label>
                        <textarea name="" id="" className="ipt-form" placeholder="강아지 상세 소개글을 입력해주세요."></textarea>
                    </div>
                </Form>
            </Desc>
            
        </div>
    )
}

export default DogEdit
const Form = styled.div`
    padding-bottom:60px;
`

const UserInfo = styled.section`
    text-align: center;
    padding:10px 0 3px;
`


const TabMenu = styled.ul`
  font-weight: bold;
  overflow: auto;
  white-space: nowrap;
  margin:0 -20px;
  padding:10px 15px 12px;
  border-bottom:1px solid var(--gray-200);
  
  li{
    position:relative;
    display: inline-block;
    margin-right:9px;
  }

  .focused {
    span{
        background:var(--primary);
        color:var(--white-000)
    }
  }

  & div.desc {
    text-align: center;
  }
`;

const Desc = styled.div`
    border-top: 7px solid var(--gray-100);
    margin:0 -20px;
    padding:20px;
`;


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