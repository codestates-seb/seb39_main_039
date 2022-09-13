import React, { useState } from "react";
import styled, { css } from "styled-components";

const Checkbox = ({ text }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onClickCheck = () => {
    setIsChecked(!isChecked);
    console.log(!isChecked);
  };

  return (
    <CheckboxWrap>
        <div onClick={onClickCheck} >
            <Checkedbox type="checkbox" isChecked={isChecked}/>
            <CheckedLabel isChecked={isChecked} ></CheckedLabel>
            <em>{text}</em>
        </div>
    </CheckboxWrap>
  );
}

export default Checkbox;
const CheckboxWrap = styled.div`
    position: relative;
    cursor: pointer;

    >div{
        display:inline-block;

        em{
            display: inline-block;
            padding-left:15px;
            line-height:1.9em
        }
    }
`;

const Checkedbox = styled.input`
    visibility: hidden;
    ${({ isChecked }) =>
        isChecked
            ? css`
                  background-color: var(--primary);
                  border-color: var(--primary);
                  &:after: {
                      opacity: 1;
                  }
              `
            : null}
`;

const CheckedLabel = styled.label`
    background-color: var(--gray-050);
    border: 1px solid var(--gray-300);
    border-radius: 6px;
    cursor: pointer;
    width: 28px;
    height: 28px;
    position: absolute;
    left: 0;
    top: 0;
    ${({ isChecked }) => {
        return isChecked
            ? css`
                  background-color: var(--primary);
                  border-color: var(--primary);
                  &:after {
                      border: 3px solid #fff;
                      border-top: none;
                      border-right: none;
                      content: "";
                      height: 6px;
                      left: 6px;
                      position: absolute;
                      top: 6px;
                      transform: rotate(-45deg);
                      width: 12px;
                  }
              `
            : css`
                  background-color: var(--gray-050) !important;
                  &:after {
                      opacity: 1;
                  }
              `}}
`;