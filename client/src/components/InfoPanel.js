import React, { useEffect, useState } from "react";
import styled from "styled-components";

const InfoPanel = ({ number, string }) => {
  const [meter, setMeter] = useState(number);
  useEffect(() => {
    setMeter(number);
  }, [number]);

  return (
    <Panel>
      <div>{meter}</div>
      <div>{string}</div>
    </Panel>
  );
};

const Panel = styled.div`
  justify-content: center;
  align-items: center;

  > div:first-child {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 3px;
  }

  > div:nth-child(2) {
    font-size: 12px;
    color: var(--gray-500);
  }
`;
export default InfoPanel;
