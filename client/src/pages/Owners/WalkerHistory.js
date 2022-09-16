import styled from "styled-components";
import { Header } from "../../components/Layout/Header";
import HistoryCard from "../../components/HistoryCard";


const WalkerHistory = () =>{
    return(
        <div className="container bg-gray">
            <Header pageTitle={'춘식이 지난 산책 내역'} />
            <List>
                <li> <HistoryCard fellow={'이지은'}/> </li>
                <li> <HistoryCard fellow={'이지은'}/> </li>
                <li> <HistoryCard fellow={'이지은'}/> </li>
                <li> <HistoryCard fellow={'이지은'}/> </li>
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