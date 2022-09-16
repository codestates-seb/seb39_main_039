import React from "react";
import styled from "styled-components";

const InfoPanel = ({ number, string }) => {
  return (
    <Panel>
      <div>{string}</div>
      <div>{number}</div>
    </Panel>
  );
};

const Panel = styled.div`
  justify-content: center;
  align-items: center;

  > div:first-child {
    font-size: 12px;
  }

  > div:nth-child(2) {
    font-size: 18px;
  }
`;
export default InfoPanel;
