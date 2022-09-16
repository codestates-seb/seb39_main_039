import styled from "styled-components";
import sampleMap from '../assets/img/sample-map.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const HistoryCard = ({fellow}) => {
    return(
        <Card>
            <span className="history-img">
                <img src={sampleMap} alt="" />
            </span>
            <div className="history-info">
                <div className="i1">
                    <p>9월 10일 토요일</p>
                    <i><FontAwesomeIcon icon={faPaw} />{fellow}</i>
                </div>
                <div className="i2">
                    <em className="label">산책</em>
                    <span><em>시간</em> 22:00</span>
                    <span><em>거리</em> 3km</span>
                </div>
            </div>
        </Card>
    )
}

export default HistoryCard

const Card = styled.div`
    cursor: pointer;
    overflow: hidden;
    border-radius:20px;
    background:var(--white-000);
    box-shadow: 0 0 10px 0 rgba(0,0,0, .15);
    transition: all .5s;

    &:hover{
        box-shadow: 0 0 15px 0 rgba(0,0,0, .3);
    }

    .history-img img{
        width:100%;
        vertical-align: bottom;
    }

    .history-info{
        border-top:1px solid var(--gray-100);
        padding:15px 20px 13px;

        .i1{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom:8px;
            p{
                font-weight:600
            }
            i{
                font-size:13px;
                svg{
                    color:var(--gray-400);
                    margin-right:3px;
                }
            }
        }
        
        .i2{
            display: flex;
            align-items: center;
            gap: 8px;
            .label{
                font-size:13px;
                border:1px solid var(--gray-200);
                border-radius: 20px;
                padding:5px 10px 4px;
            }
            span{
                font-size:14px;
                em{
                    color:var(--gray-500)
                }
            }
        }
    }
`