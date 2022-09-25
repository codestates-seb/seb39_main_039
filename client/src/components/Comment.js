import styled from "styled-components"
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Modal from '../components/Modal/Modal'
import { delComment } from "../redux/actions/commentActions";
import { editComment } from "../redux/actions/commentActions";


export const ApplyComment = ({data, wantedId}) => {
    const dispatch = useDispatch();
    const optionBody = useRef();
    const [ isOn, setIsOn ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const [ onEdit, setOnEdit ] = useState(false);
    const [ content, setContent ] = useState(data.content);
    let creatDate =new Date(data.creationDate).toLocaleString();

    const deleteComment = () => {
        dispatch(delComment(wantedId, data.commentId));
    };

    const updateComment = () => {
        dispatch(editComment(wantedId, data.commentId, content));
        setOnEdit(false);
    };

    const cancelEditComment = () => {
        setContent(data.content);
        setOnEdit(false);
    }

    const onEditHandler = () => {
        setOnEdit(true);
        setIsOn(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickModalOutside);
        return () => {
          document.removeEventListener("mousedown", clickModalOutside);
        };
    });
    
    const clickModalOutside = (event) => {
       if (!optionBody.current.contains(event.target)) {
           setIsOn(false);
       }
    };

    return(
        <Card>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                confirmHandler={deleteComment}
                text={"지원 댓글을 삭제하시겠습니까?"}
            />
            <div className="user-info">
                <div className="user-photo">
                    <img src={data.walker?.walkerPicture} className="img-circle" alt="" />
                </div>
                <div className="user-name">
                    <strong>{data.walker?.walkerName} <em>(등급 아이콘 예정)</em></strong>
                    <button>휴대폰 번호 보기</button>
                    
                    <OptionButton>
                        <i onClick={()=>setIsOn(!isOn)}><FontAwesomeIcon icon={faEllipsisVertical}/></i>
                        <ul ref={optionBody}className={isOn ? 'active' : ''}>
                            <li onClick={onEditHandler}>수정</li>
                            <li onClick={() => setIsOpen(true)}>삭제</li>
                        </ul>
                    </OptionButton>
                </div>
            </div>
            {!onEdit? 
                <div className="user-con">
                    {/* <strong>시바견의 특성을 잘 아는 지원자입니다!</strong> */}
                    <p>{content}</p>
                    <small>{creatDate} {data.lastActivityDate !== data.creationDate && "수정됨"}</small>
                </div>
            :
                <div className="user-con edit">
                    <textarea value={content} onChange={(e)=>setContent(e.target.value)}/>
                    <div className="btn-area">
                        <button className="btn-cancel" onClick={cancelEditComment}>취소</button>
                        <button className="btn-enter"onClick={updateComment}>수정하기</button>
                    </div>
                    
                </div>
            }
           
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


const OptionButton = styled.div`
    position: absolute;
    top:13px;
    right:10px;
    
    i{
        display: inline-block;
        width:35px;
        height:35px;
        text-align: center;
        line-height: 35px;
        font-size:15px;
        cursor: pointer;
    }

    ul{
        overflow: hidden;
        display: none;
        position: absolute;
        width:100px;
        top:30px;
        right:0;
        background:var(--white-000);
        box-shadow:0 0 6px 0 rgba(0,0,0, .015);
        border:1px solid var(--gray-300);
        border-radius: 5px;

        li{
            text-align: center;
            padding:10px 10px;
            font-weight: 500;
            cursor: pointer;
        }
        li+li{
            border-top:1px solid #eee;
        }

        li:hover{
            background-color:var(--gray-050)
        }
    }

    ul.active{
        display: inline-block;
    }
`

const Card= styled.div`
    position: relative;
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

    .user-con.edit{
        textarea{
            width:100%;
            border:1px solid var(--gray-200);
            border-radius: 8px;
            padding:10px;
            font-size:16px;
            min-height:100px;
        }

        .btn-area{
            display: flex;
            gap: 10px;
            margin-top:3px;
        }

        .btn-cancel{
            flex:1;
            background-color:var(--gray-200);
            color:var(--gray-500)
        }
        
        .btn-enter{
            flex:3
        }

        button{
            display: inline-block;
            width:100%;
            background:var(--primary);
            color:var(--white-000);
            padding:11px;
            border:0;
            font-size:14px;
            font-weight: 500;
            border-radius: 6px;
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