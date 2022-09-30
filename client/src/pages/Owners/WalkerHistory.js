import styled from "styled-components";
import Lottie from "lottie-react";
import { Header } from "../../components/Layout/Header";
import HistoryCard from "../../components/HistoryCard";
import {
  getPetWalkInfo,
  resetPetWalk
} from "../../redux/actions/petwalkActions";
import { getMyPetInfo } from "../../redux/actions/petActions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Loadinglottie } from "../..";
import { useInView } from "react-intersection-observer";

const WalkerHistory = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { petWalkInfo, totalPage_history } = useSelector(
    (state) => state.petwalk
  );

  const { myPetInfo } = useSelector((state) => state.pet);
  const petName = myPetInfo.filter((el) => el.petId === Number(id));

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true
  });

  const fakeFetch = (delay = 300) =>
    new Promise((res) => setTimeout(res, delay));

  const fetchMoreData = async () => {
    setPage(page + 1);
    await fakeFetch();
    if (petWalkInfo.length < totalPage_history) {
      if (petWalkInfo.length >= 5) dispatch(getPetWalkInfo(id, page));
    }
  };

  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchMoreData();
    console.log("ㅎㅎㅎ");
  }, [inView]);

  useEffect(() => {
    if (petWalkInfo || !petWalkInfo) dispatch(resetPetWalk());
    dispatch(getPetWalkInfo(id, 1));
    dispatch(getMyPetInfo(id));
  }, []);

  return (
    <div className="container bg-gray v2">
      <Header
        pageTitle={`${
          petName[0]?.petName !== undefined ? petName[0]?.petName : ""
        } 지난 산책 내역`}
        link={"/ownerMain"}
      />
      {petWalkInfo?.length !== 0 ? (
        <List>
          {petWalkInfo?.map((el, idx) => {
            return (
              <li>
                <HistoryCard data={el} key={idx} />
              </li>
            );
          })}
        </List>
      ) : (
        <div className="pg-info">
          <div>
            <i>
              <Lottie animationData={Loadinglottie} />
            </i>
            <h4>지난 산책 내역이 없습니다.</h4>
            <p>
              완료된 산책 내역을
              <br />
              이곳에서 확인 하실 수 있습니다.
            </p>
          </div>
        </div>
      )}
      <Scroll ref={ref}></Scroll>
    </div>
  );
};

export default WalkerHistory;

const List = styled.ul`
  padding: 5px 0 40px;
  li + li {
    margin-top: 20px;
  }
`;

const Scroll = styled.div`
  height: 100px;
`;
