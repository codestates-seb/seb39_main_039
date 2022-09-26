import styled from "styled-components"
import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addComment } from "../redux/actions/commentActions";


const CommentEnter = ({wantedId}) => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);
    const [content, setContent] = useState("");
    const changeHandler = (e) => {
        setContent(e.target.value)
    }

    return(
        <CommentForm>
            <strong>{userInfo.nickName}</strong>
            <textarea 
                value={content}
                onChange={changeHandler}
                placeholder="상세 지원글을 남겨주세요."></textarea>
            <button onClick={()=>dispatch(addComment(wantedId, content))}>등록</button>
        </CommentForm>
    )
}

export default CommentEnter

const CommentForm = styled.div`
    position: relative;
    padding:15px;
    background:var(--white-000);
    border:2px solid var(--primary);
    border-radius: 10px;
    margin:8px 0 30px;

    strong{
        display: block;
        font-weight: 600;
        padding-bottom:8px;
        padding-left:2px;
        color: var(--gray-700);
    }
    textarea{
        border:0;
        font-size:16px;
        width:100%;
        height:20px;
        transition:all .5s;
    }
    textarea:focus{
        outline: 0;
        height:100px;
    }
    button{
        position: absolute;
        right:15px;
        bottom:12px;
        border:0;
        background-color:var(--primary);
        color:var(--white-000);
        padding:6px 10px;
        border-radius: 5px;
        font-weight: 600;
    }
    


`