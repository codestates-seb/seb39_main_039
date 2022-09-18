import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { HeaderConfirm } from "../../components/Layout/Header";
import TrackingMap from "../../components/Map/TrackingMap";
import { DogNameLabel } from '../../components/DogNameLabel';
import StateCard from "../../components/StateCard";

const StartWalking = () => {
  const ClickHandler = () =>{
    console.log('산책 종료')
  }

  return (
    <div className="container pa0">
      <Section>
        <HeaderConfirm pageTitle={'진행중인 산책'} ConfirmName={'산책 종료'} ClickHandler={ClickHandler}/>
        <div className="walk-team">
          <dl className="walk-con">
            <dt>산책견</dt>
            <dd>
              <DogNameLabel size={'xs'} species={'시바견'} name={'춘식'}/>
              <DogNameLabel size={'xs'} species={'시바견'} name={'춘식'}/>
            </dd>
          </dl>
          <dl className="walk-con v2">
            <dt>산책자</dt>
            <dd><DogNameLabel size={'xs'} name={'이지은'}/></dd>
          </dl>
          <dl className="walk-con">
            <dt>산책 예정시간</dt>
            <dd>~ 09-11 오후 20:00까지</dd>
          </dl>
        </div>
      </Section>
      <Sect>
          <TrackingMap />
          
          <StateBoxArea>
            <li><StateCard type={'i1'} name={'산책'} count={'0'}/></li>
            <li><StateCard type={'i2'} name={'배변'} count={'0'}/></li>
          </StateBoxArea>
          <StateBoxArea>
            <li><StateCard type={'i3'} name={'식사'} count={'0'}/></li>
            <li><StateCard type={'i4'} name={'간식'} count={'0'}/></li>
          </StateBoxArea>
            
      </Sect>
      <Section></Section>
    </div>
  );
};

export default StartWalking;

const Section = styled.section`
    border-bottom:9px solid var(--gray-100);
    padding:20px;
    background: var(--white-000);

    .walk-team{
      margin:15px 0;

      .walk-con{
        display:flex;
        align-items:center;
        margin-bottom:15px;
        
        > dt{
          position:relative;
          font-weight: 600;
          padding-right:18px;
        }
        > dt:before{
          content: '';
          position: absolute;
          right:7px;
          top:50%;
          transform: translate(0, -50%);
          display: inline-block;
          width:3px;
          height:3px;
          background:var(--gray-200);
          border-radius: 10px;
        }
        > dd {
          span{
            margin-right:5px;
          }
        }
      }

      .walk-con.v2{
        margin-bottom:20px
      }
    }
`

const Sect = styled.section`
  margin:0 20px;
  padding:30px 0;
  border-bottom:1px solid var(--gray-200);
`

const StateBoxArea = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin:8px 0;
  gap:8px;

  >li{
    width:50%
  }
`