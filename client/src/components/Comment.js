import styled from "styled-components"
import { Link } from "react-router-dom"

export const ApplyComment = ({data}) => {
    let creatDate =new Date(data.creationDate).toLocaleString();
        
    return(
        <Card>
            <div className="user-info">
                <div className="user-photo">
                    <img src={data.walker?.walkerPicture} className="img-circle" alt="" />
                </div>
                <div className="user-name">
                    <strong>{data.walker?.walkerName} <em>(등급 아이콘 예정)</em></strong>
                    <button>휴대폰 번호 보기</button>
                </div>
            </div>
            <div className="user-con">
                {/* <strong>시바견의 특성을 잘 아는 지원자입니다!</strong> */}
                <p>{data.content}</p>
                <small>{creatDate}</small>
            </div>
            <Link to="/" className="user-select">이 지원자와 함께 산책 보내기</Link>
        </Card>
    )
}

export const ApplyCommentBlocked = () => {
    return(
        <Card className="blocked">
            <div className="user-info">
                <div className="user-photo">
                    <img src={'https://avatars.githubusercontent.com/u/9497404?v=4'} className="img-circle" alt="" />
                </div>
                <div className="user-name">
                    <strong>춘식아~ 산책 가자</strong>
                </div>
            </div>
        </Card>
    )
}

const Card= styled.div`
    overflow: hidden;
    background:var(--white-000);
    box-shadow: 0 0 10px 0 rgba(0,0,0, .15);
    border-radius: 15px;

    .user-info{
        display:flex;
        align-items: center;
        padding:16px 16px 10px;
        gap:14px;

        .user-name{
           font-size:14px;
           color:var(--gray-600);
           line-height: 1.4em;

            strong{
                display: block;
                font-weight: 600;
                font-size:15px;
                color:var(--black-900);
            }

            button{
                background:var(--gray-100);
                border:1px solid var(--gray-200);
                color:var(--gray-700);
                border-radius:5px;
                margin-top:2px;
                padding:3px 6px;
                font-size:12px;
            }
        }
        .user-photo{
            img{
                width:50px;
            }
        }
    }

    .user-con{
        padding:0 16px 16px;
        line-height: 1.3em;
        strong{
            display: inline-block;
            font-weight: 600;
            padding-bottom:4px;
        }

        p{
            font-size:14px;
            color:var(--gray-700)
        }

        small{
            font-size:11px;
            color:var(--gray-600);
            letter-spacing: -.035em;
        }
    }

    .user-select{
        display: inline-block;
        text-align: center;
        width:100%;
        border-top:1px solid var(--gray-200);
        color:var(--primary);
        font-weight:500;
        padding:16px 0;
    }

    .user-select:hover{
        background:var(--gray-050)
    }

    &.blocked{
        background:var(--gray-200);
        box-shadow: none;
    }
`