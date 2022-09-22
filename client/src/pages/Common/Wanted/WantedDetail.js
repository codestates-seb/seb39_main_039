import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import checkedIcon from '../../../assets/img/checkedIcon.svg';
import DogNameTag from "../../../components/DogNameTag";
import CommentEnter from "../../../components/CommentEnter";
import { ApplyComment, ApplyCommentBlocked } from "../../../components/Comment";

const WantedDetailPage = () => {
    return(
        <div className="container bg-gray pa0">
            <Section>
                <Header pageTitle={''} />
                <ConHeader>
                    <h3>이사하는 동안 춘식이 산책을 맡아 주실 분을 찾습니다.</h3>
                    <ul>
                        <li>견주닉네임</li>
                        <li>2022.09.10</li>
                    </ul>
                </ConHeader>
            </Section>
            <Section>
                <div>
                    <SectLabel>함께 산책할 강아지 <b>1마리</b></SectLabel>
                    <DogsInfo>
                        <div>
                            <DogNameTag />
                        </div>
                        <div>
                            <DogNameTag />
                        </div>
                    </DogsInfo>
                </div>
                <ConInfo>
                    <dl>
                        <dt><SectLabel>지역</SectLabel></dt>
                        <dd>서울 강동구</dd>
                    </dl>
                    <dl>
                        <dt><SectLabel>산책 희망 시간</SectLabel></dt>
                        <dd>
                            <span>
                                <small>시작 시간</small>
                                2022-09-11 오전 09:00
                            </span>
                            <span>
                                <small>종료 시간</small>
                                2022-09-11 오후 20:00
                            </span>
                        </dd>
                    </dl>
                    <dl>
                        <dt><SectLabel>산책 의뢰 주기</SectLabel></dt>
                        <dd>1회</dd>
                    </dl>
                    <dl>
                        <dt><SectLabel>산책 보수</SectLabel></dt>
                        <dd>100,000원</dd>
                    </dl>
                </ConInfo>
            </Section>
            <Section>
                <SectLabel>체크리스트</SectLabel>
                <ConCheckList>
                    <li>간식 먹이기 전에 '기다려' 훈련을 해주세요.</li>
                    <li>올림픽공원 산책을 해주세요.</li>
                    <li>가방에 있는 영양제 1포를 먹여주세요.</li>
                    <li>내용이 길어질수가 있습니다...길어질수가.. 내용이 길어질수가 있습니다...길어질수가.. 내용이 길어질수가 있습니다...길어질수가.. </li>
                </ConCheckList>
            </Section>
            <Section>
                <SectLabel>기타 주의사항</SectLabel>
                <p className="p-area">춘식이는 낯선 사람이 쓰다듬으면 신경이 날카로워져요! <br>
                </br>사람들이 예고없이 만지지 않도록 주의해주세요~</p>
            </Section>


            {/* 댓글 지원 */}
            <CommentApply>
                <CommentEnter/>
                <SectLabel>산책 지원하기 3명</SectLabel>
                <div className="comment-list">
                    <ApplyComment />
                    <ApplyComment />

                    {/* 글 작성자가 아닌 경우 코멘트 내용 가려짐*/}
                    <ApplyCommentBlocked />
                    <ApplyCommentBlocked />
                </div>
            </CommentApply>
        </div>
    )
}

export default WantedDetailPage

const Section = styled.section`
    border-bottom:9px solid var(--gray-100);
    padding:20px;
    background: var(--white-000);

    .p-area{
        padding:13px 0 20px;
        line-height: 1.3em;
        font-size:15px;
    }
`

const SectLabel = styled.section`
    font-weight:800;
    font-size:14px;

    b{
        color:var(--primary)
    }
`

const ConInfo = styled.div`
    dl{
        display:flex;
        padding:18px 0;
    }

    dl+dl{
        border-top:1px solid var(--gray-200)
    }
    
    dt{
        min-width:100px;
    }

    dd{
        span{
            display: block;
        }

        span+span{
            padding-top:15px;
        }
        span small{
            display:block;
            font-size:13px;
            color:var(--gray-600);
            font-weight:500;
            padding-bottom:5px;
        }
    }
`

const ConCheckList = styled.ul`
    li{
        position:relative;
        margin:17px 0;
        font-size:15px;
        padding-left:30px;
        line-height: 1.3em;
    }

    li:before{
        content:'';
        position:absolute;
        margin-left:-30px;
        margin-top:-2px;
        display:inline-block;
        width:23px;
        height:24px;
        background-image:url('${checkedIcon}');
        background-size:100% auto;
    }
`

const ConHeader = styled.div`
    h3{
        font-size:19px;
        font-weight: 500;
        padding-bottom:16px;
    }

    ul{
        display:flex;
        font-size:13px;

        li+li{
            margin-left:10px;
            padding-left:10px;
            border-left:1px solid var(--gray-300);
        
        }
    }
`

const CommentApply = styled.div`
    padding:20px 20px;

    .comment-list{
        >*{
            margin-top:14px;
        }
    }

    .comment-form{
        margin-bottom:20px;
    }
`   

const DogsInfo = styled.div`
    display: flex;
    gap: 20px;
    padding:15px 0;

    >*{
        width:50%;
    }
`