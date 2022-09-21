import styled from "styled-components";
import Lottie from 'lottie-react';
import { Header } from "../../components/Layout/Header";
import { Loadinglottie } from "../..";

const WalkerHistory = () =>{
    return(
        <div className="container bg-gray">
            <Header pageTitle={`대기중인 산책 내역`} />
            {/* {petWalkInfo.items.length !== 0 ?
                <List>
                    <li>대기 산책 내역</li>
                </List>
            : */}
                <div className="pg-info">
                    <div>
                        <i><Lottie animationData={Loadinglottie} /></i>
                        <h4>대기중인 산책 내역이 없습니다.</h4>
                        <p>대기중인 산책 내역을<br />이곳에서 확인 하실 수 있습니다.</p>
                    </div>
                </div>
            {/* } */}
        </div>
    )
}

export default WalkerHistory

const List = styled.ul`
    padding:5px 0 40px;
    li+li{
        margin-top:20px
    }
`