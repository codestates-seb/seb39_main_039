import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import checkedIcon from "../../../assets/img/checkedIcon.svg";
import DogNameTag from "../../../components/DogNameTag";
import CommentEnter from "../../../components/CommentEnter";
import { ApplyComment } from "../../../components/Comment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Modal from "../../../components/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import godWait from "../../../assets/img/dog_wait.png";
import {
  deleteWanted,
  getWantedDetail
} from "../../../redux/actions/wantedActions";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toast";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { getMyPetInfo } from "../../../redux/actions/petActions";

const WantedDetailPage = () => {
  const { id } = useParams();
  const { myPetInfo } = useSelector((state) => state.pet);
  const { wantedDetail, loading } = useSelector((state) => state.wanted);
  const dispatch = useDispatch();
  const optionBody = useRef();
  const [isOn, setIsOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const navigate = useNavigate();
  const [useCurrent] = useCurrentUser();
  const writeWantedUser = useCurrent(wantedDetail.walk?.owner.ownerId);

  let error = () => toast("산책 할 강아지가 없어요. 등록해주세요");

  let endTimeForm = new Date(wantedDetail.walk?.endTime + "z")
    .toLocaleString()
    .slice(0, -3);
  let startTimeForm = new Date(wantedDetail.walk?.startTime + "z")
    .toLocaleString()
    .slice(0, -3);

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
    if (window) window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getMyPetInfo());
  }, []);

  // if (!wantedDetail.walk) return <div></div>;


  return (
    <div className="container pa0 v2">
      <Section>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          confirmHandler={delWanted}
          text={"구인글을 삭제하시겠습니까?"}
        />
        <Header pageTitle={""} />
        {!wantedDetail.walk ? (
          <Loading>
            <ThreeDots color="#3183f8" height={80} width={80} />
          </Loading>
        ) : (
          <ConHeader>
            <h3>{wantedDetail.title}</h3>
            <ul>
              <li>
                <img width={10} src={wantedDetail.walk.owner?.profileImage} />{" "}
                {wantedDetail.walk.owner?.nickName}
              </li>
              <li>
                작성일{" "}
                {new Date(wantedDetail.creationDate + "z")
                  .toLocaleString()
                  .slice(0, -3)}
              </li>{" "}
            </ul>
          </ConHeader>
        )}
      </Section>
      {!wantedDetail.walk ? <></> : (
      <>
      <Section>
        <div>
          <SectLabel>
            함께 산책할 강아지 <b>{wantedDetail.walk.petList?.length}마리</b>
          </SectLabel>
          {writeWantedUser && (
            <OptionButton>
              <i onClick={() => setIsOn(!isOn)}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </i>
              <ul ref={optionBody} className={isOn ? "active" : ""}>
                <li onClick={myPetInfo.length === 0 ? error : onEditHandler}>
                  수정
                </li>
                <li onClick={() => setIsOpen(true)}>삭제</li>
              </ul>
            </OptionButton>
          )}

          <DogsInfo>
            {wantedDetail.walk.petList?.map((item) => (
              <div>
                <DogNameTag
                  name={item.petName}
                  key={item.petId}
                  species={item.species}
                  picture={item.petPicture}
                  sex={item.sex}
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
                {startTimeForm}
              </span>
              <span>
                <small>종료 시간</small>
                {endTimeForm}
              </span>
            </dd>
          </dl>
          <dl>
            <dt>
              <SectLabel>산책 보수</SectLabel>
            </dt>
            <dd>
              {wantedDetail.pay
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </dd>
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
        <SectLabel>
          산책 지원하기 {wantedDetail.commentList?.length}명
        </SectLabel>
        <div className="comment-list">
          {wantedDetail.commentList?.length !== 0 ? (
            <>
              {wantedDetail.commentList?.reverse().map((data, key) => {
                return (
                  <ApplyComment
                    data={data}
                    wantedId={wantedDetail.wantedId}
                    writerId={wantedDetail.walk?.owner.ownerId}
                    key={key}
                  />
                );
              })}
            </>
          ) : (
            <>
              <div className="no-apply">
                <i></i>
                아직 지원자가 없습니다.
                <br />
                댓글로 지원해 보세요!
              </div>
            </>
          )}
        </div>
      </CommentApply>
      </>)}
      <ToastContainer position="top-right" delay={3000} />
    </div>
  );
};

export default WantedDetailPage;

const Section = styled.section`
  border-bottom: 9px solid var(--gray-100);
  padding:20px 20px 40px;
  background: var(--white-000);

  &:first-child {
    padding-top: 0;
    padding-bottom:20px;
  }

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
    padding-top: 15px;
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
  padding: 20px 20px 60px;

  .comment-list {
    > * {
      margin-top: 12px;
    }
  }

  .comment-form {
    margin-bottom: 20px;
  }

  .no-apply {
    position: relative;
    text-align: center;
    border-radius: 15px;
    background-color: var(--gray-100);
    padding: 30px;
    line-height: 1.3em;
    font-size: 14px;
    margin-top: 50px;
    color: var(--gray-500);

    i {
      display: inline-block;
      position: absolute;
      top: -65px;
      left: 50%;
      width: 70px;
      height: 85px;
      background-image: url("${godWait}");
      background-repeat: no-repeat;
      background-size: 100% auto;
      transform: translate(-50%, 0);
    }
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
