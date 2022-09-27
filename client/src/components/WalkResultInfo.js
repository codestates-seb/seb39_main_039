import styled from "styled-components"
import InfoPanel from '../components/InfoPanel'

const WalkResultInfo = ({walkDetailInfo}) => {
    return(
        <ResultInfo>
          <InfoPanel number={walkDetailInfo.distance} string={"산책 거리"} />
          <InfoPanel number={walkDetailInfo.distance} string={"산책 시간"} />
          <InfoPanel number={`${10}`} string={"속도(분/km)"} />
        </ResultInfo>
    )
}

export default WalkResultInfo

const ResultInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 20px 0 0;

  > div {
    flex: 1;
    text-align: center;
  }
`;