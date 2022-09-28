import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import checkedIcon from "../../../assets/img/checkedIcon.svg";
import DogNameTag from "../../../components/DogNameTag";
import CommentEnter from "../../../components/CommentEnter";
import { ApplyComment, ApplyCommentBlocked } from "../../../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import useConvertTime from "../../../hooks/useConvertTime";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {
  deleteWanted,
  getWantedDetail
} from "../../../redux/actions/wantedActions";

const WantedDetailPage = () => {
  const { id } = useParams();
  const { wantedDetail, loading } = useSelector((state) => state.wanted);
  const dispatch = useDispatch();
  const optionBody = useRef();
  const [isOn, setIsOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const navigate = useNavigate();

  let endTimeForm = useConvertTime(
    wantedDetail.walk?.endTime.toLocaleString().slice(0, -3).split("T")
  );
  let startTimeForm = useConvertTime(
    wantedDetail.walk?.startTime.toLocaleString().slice(0, -3).split("T")
  );

  const onEditHandler = () => {
    setOnEdit(true);
    setIsOn(false);
    navigate(`/wantedEdit/${id}`);
  };

  const delWanted = () => {
    dispatch(deleteWanted(id));
    setOnEdit(false);
  };

  useEffect(() => {
    dispatch(getWantedDetail(id));
  }, [isOn]);

  if (!wantedDetail.walk) return <div></div>;

  return (
    <div className="container bg-gray pa0">
      {loading ? (
        <Loading>
          <ThreeDots color="#3183f8" height={80} width={80} />
        </Loading>
      ) : (
        <>
          <Section>
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              confirmHandler={delWanted}
              text={"구인글을 삭제하시겠습니까?"}
            />
            <Header pageTitle={""} />
            <ConHeader>
              <h3>{wantedDetail.title}</h3>
              <ul>
                <li>
                  <img width={10} src={wantedDetail.walk.owner?.profileImage} />{" "}
                  {wantedDetail.walk.owner?.nickName}
                </li>
                <li>작성일 {wantedDetail.creationDate?.split("T")[0]}</li>
              </ul>
            </ConHeader>
          </Section>
          <Section>
            <div>
              <SectLabel>
                함께 산책할 강아지{" "}
                <b>{wantedDetail.walk.petList?.length}마리</b>
              </SectLabel>
              <OptionButton>
                <i onClick={() => setIsOn(!isOn)}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </i>
                <ul ref={optionBody} className={isOn ? "active" : ""}>
                  <li onClick={onEditHandler}>수정</li>
                  <li onClick={() => setIsOpen(true)}>삭제</li>
                </ul>
              </OptionButton>
              <DogsInfo>
                {wantedDetail.walk.petList?.map((item) => (
                  <div>
                    <DogNameTag
                      name={item.petName}
                      key={item.petId}
                      species={item.species}
                    />
                  </div>
                ))}
              </DogsInfo>
            </div>
            <ConInfo>
              <dl>
                <dt>
                  <SectLabel>지역</SectLabel>
                </dt>
                <dd>{wantedDetail.location}</dd>
              </dl>
              <dl>
                <dt>
                  <SectLabel>산책 희망 시간</SectLabel>
                </dt>
                <dd>
                  <span>
                    <small>시작 시간</small>
                    {`${startTimeForm[0]}-${startTimeForm[1]}-${startTimeForm[2]} ${startTimeForm[3]}:${startTimeForm[4]}`}
                  </span>
                  <span>
                    <small>종료 시간</small>
                    {`${endTimeForm[0]}-${endTimeForm[1]}-${endTimeForm[2]} ${endTimeForm[3]}:${endTimeForm[4]}`}
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  <SectLabel>산책 보수</SectLabel>
                </dt>
                <dd>{wantedDetail.pay}원</dd>
              </dl>
            </ConInfo>
          </Section>
          <Section>
            <SectLabel>체크리스트</SectLabel>
            <ConCheckList>
              {wantedDetail.walk.checkList?.map((item, idx) => (
                <li key={item.petId}>{item.content}</li>
              ))}
            </ConCheckList>
          </Section>
          <Section>
            <SectLabel>기타 주의사항</SectLabel>
            <p className="p-area">{wantedDetail.walk?.caution}</p>
          </Section>

          {/* 댓글 지원 */}
          <CommentApply>
            <SectLabel>지원하기</SectLabel>
            <CommentEnter wantedId={wantedDetail.wantedId} />
            <SectLabel>산책 지원하기 3명</SectLabel>
            <div className="comment-list">
              {wantedDetail.commentList?.reverse().map((data, key) => {
                return (
                  <ApplyComment
                    data={data}
                    wantedId={wantedDetail.wantedId}
                    key={key}
                  />
                );
              })}

              {/* 글 작성자가 아닌 경우 코멘트 내용 가려짐*/}
              <ApplyCommentBlocked />
              <ApplyCommentBlocked />
            </div>
          </CommentApply>
        </>
      )}
    </div>
  );
};

export default WantedDetailPage;

const Section = styled.section`
  border-bottom: 9px solid var(--gray-100);
  padding: 20px;
  background: var(--white-000);

  .p-area {
    padding: 13px 0 20px;
    line-height: 1.3em;
    font-size: 15px;
  }
`;

const SectLabel = styled.section`
  font-weight: 800;
  font-size: 14px;

  b {
    color: var(--primary);
  }
`;

const ConInfo = styled.div`
  dl {
    display: flex;
    padding: 18px 0;
  }

  dl + dl {
    border-top: 1px solid var(--gray-200);
  }

  dt {
    min-width: 100px;
  }

  dd {
    span {
      display: block;
    }

    span + span {
      padding-top: 15px;
    }
    span small {
      display: block;
      font-size: 13px;
      color: var(--gray-600);
      font-weight: 500;
      padding-bottom: 5px;
    }
  }
`;

const ConCheckList = styled.ul`
  li {
    position: relative;
    margin: 17px 0;
    font-size: 15px;
    padding-left: 30px;
    line-height: 1.3em;
  }

  li:before {
    content: "";
    position: absolute;
    margin-left: -30px;
    margin-top: -2px;
    display: inline-block;
    width: 23px;
    height: 24px;
    background-image: url("${checkedIcon}");
    background-size: 100% auto;
  }
`;

const ConHeader = styled.div`
  h3 {
    font-size: 19px;
    font-weight: 500;
    padding-bottom: 16px;
  }

  ul {
    display: flex;
    font-size: 13px;

    li + li {
      margin-left: 10px;
      padding-left: 10px;
      border-left: 1px solid var(--gray-300);
    }
  }
`;

const CommentApply = styled.div`
  padding: 20px 20px;

  .comment-list {
    > * {
      margin-top: 12px;
    }
  }

  .comment-form {
    margin-bottom: 20px;
  }
`;

const DogsInfo = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px 0;

  > * {
    width: 50%;
  }
`;

const Loading = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const OptionButton = styled.div`
  z-index: 99;
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
