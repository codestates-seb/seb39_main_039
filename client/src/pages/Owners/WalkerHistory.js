import styled from "styled-components";
import { Header } from "../../components/Layout/Header";
import HistoryCard from "../../components/HistoryCard";
import { getPetWalkInfo } from "../../redux/actions/petwalkActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const WalkerHistory = () =>{
    const dispatch = useDispatch();
    const petWalkInfo = useSelector((state)=> state.petwalk.petWalkInfo);

    useEffect(()=>{
        dispatch(getPetWalkInfo(1));
    },[])

    console.log(petWalkInfo);
    return(
        <div className="container bg-gray">
            <Header pageTitle={`춘식이 지난 산책 내역`} />
            <List>
                {petWalkInfo.items.map((el)=>{
                    return(
                        <li> 
                            <HistoryCard 
                                startTime={el.startTime}
                                endTime={el.endTime}
                                distance={el.distance}
                                walker={el.walker}
                            /> 
                        </li>
                    )
                })}
            </List>
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