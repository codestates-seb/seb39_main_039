import React, { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import { ButtonPrimary } from "../../../components/Button/Buttons";
import Arrows from "../../../assets/img/arrows.svg";
import checkImg from '../../../assets/img/ck.svg'
import checkOnImg from '../../../assets/img/ck-on.svg'
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const [checkItems, setCheckItems] = useState([]);
  const navigate = useNavigate();
  const data = [
    { id: 0, title: "알바멍 이용 약관 동의 (필수)" },
    { id: 1, title: "개인정보 수집 이용 동의 (선택)" }
  ];
  
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  return (
    <div className="container">
      <ConPanel>
        <div>
          <Header pageTitle={"이메일 회원가입"} />
          <PageSummary>
            알바멍을 이용하시려면
            <br />
            약관동의가 필요합니다.
          </PageSummary>

          <FormArea>
            <div className="allCheck">
              <CheckboxWrap>
                <div>
                  <input
                    type="checkbox"
                    id="selectAll"
                    checked={checkItems.length === data.length ? true : false}
                    onChange={(e) => handleAllCheck(e.target.checked)}
                  />
                  <label htmlFor="selectAll"><b>전체 약관 동의</b></label>
                  
                </div>
              </CheckboxWrap>
            </div>

            {data?.map((data, key) => (
              <div className="check" key={key}>
                <CheckboxWrap >
                  <div>
                    <input
                      type="checkbox"
                      id={`select-${data.id}`}
                      checked={checkItems.includes(data.id) ? true : false}
                      onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                    />
                    <label htmlFor={`select-${data.id}`}>{data.title}</label>
                  </div>
                </CheckboxWrap>
              </div>
            ))}
          </FormArea>
        </div>
        <div>
          <ButtonPrimary onClick={() => {navigate("/signup");}}>다음</ButtonPrimary>
        </div>
      </ConPanel>
    </div>
  );
};

export default Terms;

const ConPanel = styled.div`
  display: flex;
  min-height: 100vh;
  padding-bottom: 4vh;
  flex-direction: column;
  justify-content: space-between;
`;

const PageSummary = styled.h3`
  margin: 25px 0 15px;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4em;
`;

const FormArea = styled.div`
  padding: 20px 0;

  .allCheck {
    border-bottom: 1px solid var(--gray-200);
    padding-bottom: 17px;
    margin-bottom: 17px;
    em {
      font-weight: 600;
    }
  }

  .check {
    position: relative;
    background-image: url("${Arrows}");
    background-repeat: no-repeat;
    background-position: 98% 50%;
  }

  .check + .check {
    margin-top: 17px;
  }
`;

const CheckboxWrap = styled.div`
  position: relative;
  height:38px;
  cursor: pointer;

  > div {
    display: inline-block;

    em {
      display: inline-block;
      padding-left: 15px;
      line-height: 1.6em;
    }
  }

  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + label {
    position: absolute;
    top:0;
    left:0;
    display: inline-block;
    padding-left:30px;
    background-image: url('${checkImg}') !important;
    background-repeat: no-repeat;
    background-position: 0 46%;
    line-height: 40px;

    b{
      font-weight: 600;
    }
  }

  input[type='checkbox']:checked + label {
    background-image: url('${checkOnImg}') !important;
  }
`;
