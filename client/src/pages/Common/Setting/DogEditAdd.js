import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import { ButtonPrimaryXS } from "../../../components/Button/Buttons";
import dogIcon from '../../../assets/img/dog-detective.png';
import dogItemIcon from '../../../assets/img/dog-detective-item.png';

const DogEditAdd = () => {

  return (
    <div className="container bg-gray v2">
      <Header pageTitle={"강아지 정보 수정"} link={"/setting"} />
      <div className="pg-info">
        <EmptyDataPage>
            <div className="icon-area">
                <i className="swing"></i>
            </div>
            <p>등록된 강아지가 없습니다.</p>
            <ButtonPrimaryXS >강아지 추가하러 가기</ButtonPrimaryXS>
        </EmptyDataPage>
      </div>
    </div>
  );
};

export default DogEditAdd;

const EmptyDataPage = styled.div`
    width:100%;
    padding:0 40px;

    p{
        padding:0 0 15px;
        font-size:16px;
        margin-top:0;
    }

    .icon-area{
        position: relative;
        display:inline-block;
        width:130px;
        height:150px;
        margin-top:-30px;
        background-image: url('${dogIcon}');
        background-size:100% auto;

        i{
            position: absolute;
            bottom:18px;
            left:-10px;
            display: inline-block;
            width:40px;
            height:68px;
            background-image: url('${dogItemIcon}');
            background-size:100% auto;
            background-repeat: no-repeat;
        }
    }
    .swing {
        animation: swing ease-in-out 1s infinite alternate;
        transform-origin: center -20px;
    }
    @keyframes swing {
        0% { transform: rotate(3deg); }
        100% { transform: rotate(-3deg); }
    }
`