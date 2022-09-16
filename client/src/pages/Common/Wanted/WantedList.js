import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import WantedCard from "../../../components/WantedCard";
import { SwitchButton } from "../../../components/Switch";
import { FloatingBtnAdd } from "../../../components/Button/FloatingBtn";
import DropDown from "../../../components/DropDown";

const WantedList = () => {
    const [isOn, setIsOn]= useState(false);
    const toggleHandler = () => {
        setIsOn(!isOn)
    }

    const sortData = [
        {name : '최신순'},
        {name : '최신순'},
        {name : '최신순'},
        {name : '최신순'}
    ]

    const sortData2 = [
        {name : '서울 강동구'},
        {name : '서울 강동구'},
        {name : '서울 강동구'},
        {name : '서울 강동구'}
    ]

    return(
        <div className="container bg-gray">
            <Header pageTitle={'구인글 리스트'} useRight="on" />
            <ListFilter>
                <ul className="sort-group">
                    <li><DropDown name={'최신순'} data={sortData}/></li>
                    <li><DropDown name={'서울 강동구'} data={sortData2}/></li>
                </ul>
                <SwitchGroup>
                    <em>매칭 된 글 제외</em>
                    <SwitchButton isOn={isOn} toggleHandler={toggleHandler}/>
                </SwitchGroup>
            </ListFilter>
            
            <WantedCardList>
                <WantedCard />
                <WantedCard />
                <WantedCard />
                <WantedCard />
                <WantedCard />
                <WantedCard />
                <WantedCard />
                <WantedCard />
                <FloatingBtnAdd mid={'wandtedCreate'} />
            </WantedCardList>
        </div>
    )
}

export default WantedList

const ListFilter = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size:15px;
    font-weight: 500;
    margin:15px 0 10px;

    .sort-group{
        display:flex;
        gap: 10px;
    }
`

const WantedCardList = styled.div`
    >div{
        margin:8px 0;
    }
`

const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Pretendard-Medium';
  gap:5px;
`