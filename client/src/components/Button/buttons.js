import styled from "styled-components";

export const ButtonPrimary = styled.button`
  width: 100%;
  padding: 0.85em 0 0.75em;
  background-color: var(--primary);
  border: 2px solid transparent;
  border-radius: 15px;
  font-size: 20px;
  font-weight: 600;
  color: var(--white-000);
  transition: all 0.7s;

  &:hover {
    background-color: var(--primary-active);
  }

  &:disabled {
    background-color: var(--gray-200);
    color: var(--gray-400);
  }
`;

export const ButtonPrimaryXS = styled(ButtonPrimary)`
  width: auto;
  padding: 8px 9px 7px;
  border-radius: 10px;
  font-weight: 600;
  font-size:15px;

  &:hover {
    background-color: var(--primary-active);
  }

  &:disabled {
    background-color: var(--gray-200);
    color: var(--gray-400);
  }
`;

export const ButtonPrimaryLine = styled(ButtonPrimary)`
  background-color: var(--white-000);
  border-color: var(--primary);
  color: var(--black-900);

  &:hover {
    background-color: var(--white-000);
    border-color: var(--primary-active);
  }
`;
