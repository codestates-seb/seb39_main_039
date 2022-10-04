import styled from "styled-components";
import Lottie from "lottie-react";
import { Header } from "../../components/Layout/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loadinglottie } from "../..";
import {
  getPetWalkPendingInfo,
  resetPetWalk,
} from "../../redux/actions/petwalkActions";
import PendingCard from "../../components/PendingCard";
import { useInView } from "react-intersection-observer";

const WalkerHistory = () => {
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { petWalkPendingInfo, totalPage_pending } = useSelector(
    (state) => state.petwalk
  );

  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  const fakeFetch = (delay = 300) =>
    new Promise((res) => setTimeout(res, delay));

  const fetchMoreData = async () => {
    setPage(page + 1);
    await fakeFetch();
    if (petWalkPendingInfo.length < totalPage_pending) {
      if (petWalkPendingInfo.length >= 10)
        dispatch(getPetWalkPendingInfo(id, page));
    }
  };

  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchMoreData();
  }, [inView]);

  useEffect(() => {
    if (petWalkPendingInfo || !petWalkPendingInfo) dispatch(resetPetWalk());
    dispatch(getPetWalkPendingInfo(id, 1));
  }, []);

  return (
    <div className="container bg-gray v2">
      <Header pageTitle={`대기중인 산책 내역`} link={"/ownerMain"} />
      {petWalkPendingInfo?.length !== 0 ? (
        <List>
          {petWalkPendingInfo?.map((el, idx) => {
            return (
              <li>
                <PendingCard el={el} ket={el.petId} />
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
            <h4>대기중인 산책 내역이 없습니다.</h4>
            <p>
              대기중인 산책 내역을
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
  height: 200px;
`;
