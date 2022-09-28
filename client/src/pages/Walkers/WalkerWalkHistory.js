import styled from "styled-components";
import Lottie from "lottie-react";
import {Header} from "../../components/Layout/Header";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Loadinglottie} from "../..";
import {getWalkerWalkHistory} from "../../redux/actions/walkerActions";
import WalkerWalkListCard from "../../components/WalkerWalkListCard";


const WalkerWalkHistory = () => {
    const navigate = useNavigate();
    const [walkHistory, setWalkHistory] = useState(null);
    // const userName = walkHistory.items[0]?.walker?.walkerName;


    useEffect(() => {
        getWalkerWalkHistory(setWalkHistory, 1);
    }, []);

    console.log(walkHistory);

    if (!walkHistory) return <div></div>;
    return (<div className="container bg-gray v2">
        <Header pageTitle={`${walkHistory.items[0]?.walker?.walkerName}님의 지난 산책 내역`} link={'/ownerMain'}/>
        {walkHistory.items !== null ?
            (<List>
                {walkHistory.items?.map((el, idx) => {
                    return (
                        <li onClick={() => {
                            navigate(`/walking/${el.walkId}`);
                        }}>
                            <WalkerWalkListCard
                                el={el}
                            />
                        </li>
                    );
                })}
            </List>) : (<div className="pg-info">
                <div>
                    <i>
                        <Lottie animationData={Loadinglottie}/>
                    </i>
                    <h4>지난 산책 내역이 없습니다.</h4>
                    <p>
                        완료된 산책 내역을
                        <br/>
                        이곳에서 확인 하실 수 있습니다.
                    </p>
                </div>
            </div>)}
    </div>);
};
export default WalkerWalkHistory;

const List = styled.ul`
  padding: 5px 0 40px;
  li + li {
    margin-top: 20px;
  }
`;
