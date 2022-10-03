import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal/Modal";
import {
  delComment,
  editComment,
  selectComment
} from "../redux/actions/commentActions";
import SelectWalkerButton from "./Button/SelectWalkerButton";
import GetContactButton from "./Button/GetContactButton";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const ApplyComment = ({ data, wantedId, writerId }) => {
  const dispatch = useDispatch();
  const optionBody = useRef();
  const [isOn, setIsOn] = useState(false); // 수정,삭제 옵션툴
  const [isOpen, setIsOpen] = useState(false); // 댓글 삭제 모달
  const [isMtOpen, setIsMtOpen] = useState(false); // 매칭 모달
  const [onEdit, setOnEdit] = useState(false); // 수정 폼
  const [content, setContent] = useState(data.content);
  const [useCurrent] = useCurrentUser();
  const writerUser = useCurrent(writerId);
  const applicantUser = useCurrent(data.walker?.walkerId);

  let creatDate = new Date(data.creationDate + "z").toLocaleString();

  const deleteComment = () => {
    dispatch(delComment(wantedId, data.commentId));
  };

  const updateComment = () => {
    dispatch(editComment(wantedId, data.commentId, content));
    setOnEdit(false);
  };

  const pickComment = () => {
    dispatch(selectComment(wantedId, data.commentId, true));
    setIsMtOpen(false);
  };

  const cancelPickComment = () => {
    dispatch(selectComment(wantedId, data.commentId, false));
    setIsMtOpen(false);
  };

  const cancelEditComment = () => {
    setContent(data.content);
    setOnEdit(false);
  };

  const onEditHandler = () => {
    setOnEdit(true);
    setIsOn(false);
  };

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

  return (
    <>
      <Card className={writerUser || applicantUser ? "show" : "blocked"}>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          confirmHandler={deleteComment}
          text={"지원 댓글을 삭제하시겠습니까?"}
        />
        <div className="user-info">
          <div className="user-photo">
            <img
              src={data.walker?.walkerPicture}
              className="img-circle"
              alt=""
            />
            {data.matched ? (
              <i>
                <FontAwesomeIcon icon={faCheck} />
              </i>
            ) : (
              ""
            )}
          </div>
          <div className="user-name">
            <strong>{data.walker?.walkerName}</strong>
            {writerUser ? (
              <div className="user-contact">
                <GetContactButton
                  wantedId={wantedId}
                  commentId={data.commentId}
                  walker={data.walker?.walkerName}
                  photo={data.walker?.walkerPicture}
                />
              </div>
            ) : (
              <div>산책 지원합니다!</div>
            )}
            {applicantUser && (
              <OptionButton>
                <i onClick={() => setIsOn(!isOn)}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </i>
                <ul ref={optionBody} className={isOn ? "active" : ""}>
                  <li onClick={onEditHandler}>수정</li>
                  <li onClick={() => setIsOpen(true)}>삭제</li>
                </ul>
              </OptionButton>
            )}
          </div>
        </div>
        {!onEdit ? (
          <div className="user-con">
            <p>{content}</p>
            <small>
              {creatDate}{" "}
              {data.lastActivityDate !== data.creationDate && "수정됨"}
            </small>
          </div>
        ) : (
          <div className="user-con edit">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="btn-area">
              <button className="btn-cancel" onClick={cancelEditComment}>
                취소
              </button>
              <button className="btn-enter" onClick={updateComment}>
                수정하기
              </button>
            </div>
          </div>
        )}
        {writerUser && (
          <>
            {data.matched ? (
              <SelectWalkerButton
                pickComment={cancelPickComment}
                isMtOpen={isMtOpen}
                setIsMtOpen={setIsMtOpen}
                cancel={"cancel"}
                btnText={"매칭 취소"}
                text={"산책 매칭을 취소하시겠습니까?"}
              />
            ) : (
              <SelectWalkerButton
                pickComment={pickComment}
                isMtOpen={isMtOpen}
                setIsMtOpen={setIsMtOpen}
                btnText={"이 지원자와 함께 산책 보내기"}
                text={"이 지원자와 산책을 보내시겠습니까?"}
              />
            )}
          </>
        )}
      </Card>
    </>
  );
};

const OptionButton = styled.div`
  position: absolute;
  top: 13px;
  right: 10px;

  i {
    display: inline-block;
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    font-size: 15px;
    cursor: pointer;
  }

  ul {
    overflow: hidden;
    display: none;
    position: absolute;
    width: 100px;
    top: 30px;
    right: 0;
    background: var(--white-000);
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.015);
    border: 1px solid var(--gray-300);
    border-radius: 5px;

    li {
      text-align: center;
      padding: 10px 10px;
      font-weight: 500;
      cursor: pointer;
    }
    li + li {
      border-top: 1px solid #eee;
    }

    li:hover {
      background-color: var(--gray-050);
    }
  }

  ul.active {
    display: inline-block;
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  background: var(--white-000);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
  border-radius: 15px;

  .user-info {
    display: flex;
    align-items: center;
    padding: 16px 16px 10px;
    gap: 14px;

    .user-name {
      font-size: 14px;
      color: var(--gray-600);
      line-height: 1.4em;

      strong {
        display: block;
        font-weight: 600;
        font-size: 15px;
        color: var(--black-900);
      }
    }
    .user-photo {
      position: relative;
      img {
        width: 50px;
      }
      i {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        right: -5px;
        bottom: 0;
        width: 26px;
        height: 26px;
        color: var(--white-000);
        font-size: 13px;
        font-weight: 800;
        background-color: var(--primary);
        border-radius: 50px;
        padding: 5px;
      }
    }
  }

  .user-con {
    padding: 0 16px 16px;
    line-height: 1.3em;
    strong {
      display: inline-block;
      font-weight: 600;
      padding-bottom: 4px;
    }

    p {
      font-size: 14px;
      color: var(--gray-700);
    }

    small {
      font-size: 11px;
      color: var(--gray-600);
      letter-spacing: -0.035em;
    }
  }

  .user-con.edit {
    textarea {
      width: 100%;
      border: 1px solid var(--gray-200);
      border-radius: 8px;
      padding: 10px;
      font-size: 16px;
      min-height: 100px;
    }

    .btn-area {
      display: flex;
      gap: 10px;
      margin-top: 3px;
    }

    .btn-cancel {
      flex: 1;
      background-color: var(--gray-200);
      color: var(--gray-500);
    }

    .btn-enter {
      flex: 3;
    }

    button {
      display: inline-block;
      width: 100%;
      background: var(--primary);
      color: var(--white-000);
      padding: 11px;
      border: 0;
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
    }
  }

  .user-select {
    display: inline-block;
    border: 0;
    text-align: center;
    width: 100%;
    border-top: 1px solid var(--gray-200);
    background-color: var(--white-000);
    color: var(--primary);
    font-weight: 500;
    font-size: 15px;
    padding: 16px 0;
  }
  .user-select.cancel {
    color: var(--err-danger);
  }

  .user-select:hover {
    background: var(--gray-050);
  }

  &.blocked {
    .user-contact,
    .user-con {
      display: none;
    }
    background: var(--gray-200);
    box-shadow: none;
  }
`;
