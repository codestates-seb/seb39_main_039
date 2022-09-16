import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header } from "../../components/Layout/Header";
import { DogNameLabelType2 } from "../../components/DogNameLabel";
import { ButtonPrimary } from "../../components/Button/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import checkedIcon from '../../assets/img/checkedIcon.svg';
import DatePicker from 'react-datepicker';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { ko } from "date-fns/esm/locale";
import { useInputAutoHeight } from "../../hooks/useInput";


const WantedCreate = (  ) => {
    const [checkItemContent, lineHeight, checkItemChangeHandler, checkItemEnterHandler] = useInputAutoHeight('');

    const [startDate, setStartDate] = useState(
        setHours(setMinutes(new Date(), 30), 17)
    );

    const [endDate, setEndDate] = useState(
        setHours(setMinutes(new Date(), 30), 17)
    );

    const checklistData = [
        {title:'간식 먹이기 전에 훈련을 해주세요.'},
        {title:'올림픽공원 산책을 해주세요.'},
        {title:'가방에 있는 영양제 1포를 먹여주세요.'},
    ]
    return(
        <div className="container">
            <Header pageTitle={'구인 글 작성'} />
            <Form>
                <Section className="pt0 pb20">
                    <label className="ipt-label">산책할 강아지 선택</label>
                    <DogSelect>
                        <li className="active"><DogNameLabelType2 name={'춘식'} size={'lg'} /></li>
                        <li><DogNameLabelType2 name={'춘식'} size={'lg'}  /></li>
                        <li><DogNameLabelType2 name={'춘식'} size={'lg'} /></li>
                    </DogSelect>
                </Section>
                <Section className="pb20">
                    <div className="ipt-group">
                        <label htmlFor="" className="ipt-label">지역</label>
                        <select className="ipt-form">
                            <option>지역을 선택해주세요.</option>
                            <option>지역을 선택해주세요.</option>
                            <option>지역을 선택해주세요.</option>
                            <option>지역을 선택해주세요.</option>
                            <option>지역을 선택해주세요.</option>
                        </select>
                    </div>

                    <div className="ipt-group">
                        <label htmlFor="" className="ipt-label">산책 희망 시간</label>
                        <small className="ipt-label-sm pt10">시작 시간</small>
                        <DatePicker
                            locale={ko}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            minTime={setHours(setMinutes(new Date(), 0), 17)}
                            maxTime={setHours(setMinutes(new Date(), 30), 40)}
                            dateFormat=" yyyy년 MMMM d일,  aa h:mm"
                        />

                        <small className="ipt-label-sm">종료 시간</small>
                        <DatePicker
                            locale={ko}
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            showTimeSelect
                            minTime={setHours(setMinutes(new Date(), 0), 17)}
                            maxTime={setHours(setMinutes(new Date(), 30), 40)}
                            dateFormat=" yyyy년 MMMM d일,  aa h:mm"
                        />
                    </div>

                    <div className="ipt-group">
                        <label htmlFor="" className="ipt-label">산책 의뢰 주기</label>
                        <input 
                            type="text" 
                            className="ipt-form"
                            name="username"
                            placeholder="주기를 입력해주세요."/>
                    </div>

                    <div className="ipt-group">
                        <label htmlFor="" className="ipt-label">산책 보수</label>
                        <div className="ipt-unit">
                            <input 
                                type="text" 
                                className="ipt-form"
                                name="username"
                                placeholder="예)100,000"/>
                            <span>원</span>
                        </div>
                    </div>
                </Section>
                <Section>
                    <label className="ipt-label">체크리스트</label>
                    <ConCheckList>
                        {checklistData.map((el, idx) =>{
                            return(
                                <li key={idx}>{el.title}</li>
                            )
                        })}
                    </ConCheckList>
                    <ChackEntryInput>
                        <textarea 
                            className="ipt-form auto-height" 
                            placeholder="체크리스트를 추가 할 수 있습니다"
                            value={checkItemContent}
                            onChange={checkItemChangeHandler}
                            onKeyDown={checkItemEnterHandler}
                            style={{height: ((lineHeight * 27) + 27) + 'px'}}
                        ></textarea>
                        <small><FontAwesomeIcon icon={faCirclePlus}/> 추가</small>
                    </ChackEntryInput>
                </Section>
                <Section className="bb0 pb0">
                    <label className="ipt-label">기타 주의사항</label>
                    <textarea className="ipt-form" placeholder="기타 주의사항을 입력해주세요."></textarea>
                </Section>

                <Link to="/wantedDetail"><ButtonPrimary>등록하기</ButtonPrimary></Link>
            </Form>
        </div>
    )
}

export default WantedCreate

const Section = styled.section`
    padding:20px 0 40px;
    margin:20px 0;
    border-bottom:1px solid var(--gray-200);
`

const Form = styled.div`
    padding-bottom:80px;
`

const DogSelect = styled.ul`
    padding:2px 0 5px;
    li{
        display: inline-block;
        margin-right:9px
    }

    .active{
        span{
            background:var(--primary);
            color:var(--white-000)
        }
    }
`

const ConCheckList = styled.ul`
    margin-top:10px;
    li{
        position:relative;
        font-size:15px;
        padding-left:30px;
        line-height: 1.3em;
    }
    li+li{
        margin:20px 0;
    }
    li:before{
        content:'';
        position:absolute;
        margin-left:-30px;
        margin-top:-2px;
        display:inline-block;
        width:23px;
        height:24px;
        background-image:url('${checkedIcon}');
        background-size:100% auto;
    }
`

const ChackEntryInput = styled.div`
    position:relative;
    textarea{
        padding-right:66px !important;
    }
    small{
        cursor: pointer;
        position:absolute;
        display: inline-block;
        border-radius: 8px;
        padding:13px 10px;
        bottom:10px;
        right:10px;
        color:var(--primary);
        font-weight: 800;
        font-size:14px;
    }

    small:hover{
        background-color:var(--gray-100)
    }
`