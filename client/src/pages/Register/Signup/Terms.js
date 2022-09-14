import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Header } from "../../../components/Layout/Header";
import { ButtonPrimary } from '../../../components/Button/Buttons';
import { AllCheckbox, EachCheckbox } from '../../../components/Inputs/Checkbox';
import Arrows from '../../../assets/img/arrows.svg';
import { Link } from "react-router-dom";

const Terms = () => {
    const data = [
        {id: 0, title: '알바멍 이용 약관 동의 (필수)'},
        {id: 1, title: '개인정보 수집 이용 동의 (선택)'},
      ];
    
      // 체크된 아이템을 담을 배열
      const [checkItems, setCheckItems] = useState([]);
    
      console.log(checkItems)
  
      // 체크박스 전체 선택
      const handleAllCheck = (checked) => {
        if(checked) {
          // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
          const idArray = [];
          data.forEach((el) => idArray.push(el.id));
          setCheckItems(idArray);
        }
        else {
          // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
          setCheckItems([]);
        }
      }

      // 체크박스 단일 선택
      const handleSingleCheck = (checked, id) => {
        if (checked) {
          // 단일 선택 시 체크된 아이템을 배열에 추가
          setCheckItems(prev => [...prev, id]);
        } else {
          // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
          setCheckItems(checkItems.filter((el) => el !== id));
        }
      };
    
      

    return(
        <div className="container">
             <ConPanel>
                <div>
                    <Header pageTitle={'이메일 회원가입'} />
                    <PageSummary>알바멍을 이용하시려면<br />약관동의가 필요합니다.</PageSummary>
                    
                    <FormArea>
                        <div className="allCheck">
                            <AllCheckbox 
                                text={'전체 약관 동의'}
                                checkItems={checkItems}
                                dataLength={data.length}
                                onChangeHandler={handleAllCheck}
                            />
                        </div>

                        {data?.map((data, key) => (
                            <div className="check" key={key}>
                                <EachCheckbox 
                                    text={data.title}
                                    data={data}
                                    checkItems={checkItems}
                                    onChangeHandler={handleSingleCheck}
                                />
                                
                                <Link to="/"></Link>
                            </div>
                            
                        ))}
                    </FormArea>
                </div>
                <div>
                    <ButtonPrimary>다음</ButtonPrimary>
                </div>
             </ConPanel>
        </div>
    )
}

export default Terms;

const ConPanel = styled.div`
    display: flex;
    min-height:100vh;
    padding-bottom:4vh;
    flex-direction: column;
    justify-content:space-between;
`

const PageSummary = styled.h3`
    margin:25px 0 15px;
    font-size:20px;
    font-weight: 500;
    line-height: 1.4em;
`

const FormArea = styled.div`
    padding:20px 0;

    .allCheck{
        border-bottom:1px solid var(--gray-200);
        padding-bottom:17px;
        margin-bottom:17px;
        em{
            font-weight: 600;
        }
    }

    .check{
        position: relative;
        a{
            position: absolute;
            top:50%;
            right:0;
            transform: translate(0, -50%);
            display: inline-block;
            width:50px;
            height:27px;
            background-image:url('${Arrows}');
            background-repeat: no-repeat;
            background-position:80% 50%;
        }
    }

    .check+.check{
        margin-top:17px;
    }

`
