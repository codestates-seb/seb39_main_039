import styled from "styled-components";
import sampleMap from '../assets/img/sample-map.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const HistoryCard = ({startTime, endTime, distance, walker}) => {
    let days = (getDayOfWeek(new Date(startTime)));
    let total = totalTime((new Date(startTime)), new Date(endTime));
    let MakeTime = MakeDateForm(total);

    function getDayOfWeek(date){ 
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const dayOfWeek = week[new Date(date).getDay()];
        return dayOfWeek;
    }
    
    function totalTime(start, end){
        return (end.getTime() - start.getTime()) / (1000*60);;
    }

    function MakeDateForm(total) {
        var hour = parseInt(total/3600) < 10 ? '0'+ parseInt(total/3600) : min(total/3600);
        var min = parseInt((total%3600)/60) < 10 ? '0'+ parseInt((total%3600)/60) : parseInt((total%3600)/60);
        var sec = total % 60 < 10 ? '0'+total % 60 : total % 60;
        return hour+":"+min+":" + sec;
    }
    
    return(
        <Card>
            <span className="history-img">
                <img src={sampleMap} alt="" />
            </span>
            <div className="history-info">
                <div className="i1">
                    <p>{new Date(startTime).toISOString().split('T')[0]} {days}</p>
                    <i><FontAwesomeIcon icon={faPaw} />{walker?.walkerName}</i>
                </div>
                <div className="i2">
                    <em className="label">산책</em>
                    <span><em>시간</em> {MakeTime}</span>
                    <span><em>거리</em> {distance}km</span>
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