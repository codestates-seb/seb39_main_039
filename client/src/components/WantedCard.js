import styled from "styled-components";
import { DogNameLabel } from "./DogNameLabel";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WantedCard = () => {
    return(
        <Card>
            <div className="con-dogs">
                <DogNameLabel species={'시바'} name={'춘식'} size={'xs'}/>
                <DogNameLabel species={'시바'} name={'춘식'} size={'xs'}/>
            </div>
            <p className="con-title">
                <em>매칭 완료</em>
                이사하는 동안 춘식이 산책을 맡아주실 분을 찾습니다.
            </p>
            <ul className="con-info">
                <li>
                    <dl>
                        <dt><FontAwesomeIcon icon={faLocationDot} /> 지역</dt>
                        <dd>서울 강동구</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt><FontAwesomeIcon icon={faSackDollar} /> 보수</dt>
                        <dd>100,000원</dd>
                    </dl>
                </li>
                <li>
                    <dl>
                        <dt><FontAwesomeIcon icon={faDog} /> 시간</dt>
                        <dd>09-11 오전 09:00 ~ 09-11 오후 20:00</dd>
                    </dl>
                </li>
            </ul>
        </Card>
    )
}

export default WantedCard


const Card = styled.div`
    background:var(--white-000);
    padding:12px;
    border:1px solid var(--gray-200);
    border-radius:10px;
    cursor: pointer;

    .con-dogs{
        gap:5px;
        >*{margin-right:5px}
    }

    .con-title{
        font-weight: 800;
        margin:10px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        em{
            display: inline-block;
            padding:6px 6px;
            font-size:.75em;
            border-radius: 5px;
            background:var(--primary);
            color:var(--white-000);
            margin-right:4px;
        }
    }

    .con-info{
        dl{
            display: flex;
            font-size:11px;
            margin:7px 0;
        }
        dt{
            color:var(--gray-500);
            margin-right:10px;
            font-weight: 500;

            svg{
                opacity: .8;
                width:12px;
            }
        }
    }

    &:hover{
        box-shadow: 0 0 15px 0 rgba(0,0,0, .07);
    }
`