import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";

// 약관 전체동의
export const AllCheckbox = ({
  text,
  onChangeHandler,
  checkItems,
  dataLength
}) => {
  const onClickCheck = () => {};

  return (
    <CheckboxWrap>
      <div onClick={onClickCheck}>
        <input
          type="checkbox"
          name="select-all"
          checked={checkItems.length === dataLength ? true : false}
          onChange={(e) => onChangeHandler(e.target.checked)}
        />
        {/* <CheckedLabel isChecked={checkItems.length === dataLength ? true : false} ></CheckedLabel> */}
        <em>{text}</em>
      </div>
    </CheckboxWrap>
  );
};

// 약관 개별 동의
export const EachCheckbox = ({ data, text, onChangeHandler, checkItems }) => {
  const inputRef = useRef(null);

  const onClickCheck = () => {};

  return (
    <CheckboxWrap>
      <div onClick={onClickCheck}>
        <input
          type="checkbox"
          name={`select-${data.id}`}
          checked={checkItems.includes(data.id) ? true : false}
          ref={inputRef}
          onChange={(e) => onChangeHandler(e.target.checked, data.id)}
        />
        {/* <CheckedLabel isChecked={checkItems.includes(data.id) ? true : false} ></CheckedLabel> */}
        <em>{text}</em>
      </div>
    </CheckboxWrap>
  );
};

export const Checkbox = ({ text, func, id, checking }) => {
  const checkBox = useRef();
  const [isChecked, setIsChecked] = useState(checking);
  const onClickCheck = () => {
    setIsChecked(!isChecked);
    func(!isChecked, id);
  };

  return (
    <CheckboxWrap>
      <div onClick={onClickCheck}>
        <Checkedbox type="checkbox" isChecked={isChecked} ref={checkBox} />
        <CheckedLabel isChecked={isChecked}></CheckedLabel>
        <em>{text}</em>
      </div>
    </CheckboxWrap>
  );
};

const CheckboxWrap = styled.div`
  position: relative;
  cursor: pointer;

  > div {
    display: inline-block;

    em {
      display: inline-block;
      padding-left: 15px;
      line-height: 1.6em;
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
        `;
  }}
`;
