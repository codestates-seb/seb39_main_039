import styled from "styled-components";
import Lottie from "lottie-react";
import { Header } from "../../components/Layout/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loadinglottie } from "../..";
import {
  getWalkerWalkHistory,
  resetWalkerWalk
} from "../../redux/actions/walkerActions";
import WalkerWalkListCard from "../../components/WalkerWalkListCard";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const WalkerWalkHistory = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { walkerWalkHistory, totalPage_history } = useSelector(
    (state) => state.walker
  );

  const { ref, inView } = useInView({
    threshold: 0.7
  });

  const fakeFetch = (delay = 300) =>
    new Promise((res) => setTimeout(res, delay));

  const fetchMoreData = async () => {
    setPage(page + 1);
    await fakeFetch();
    if (walkerWalkHistory.length < totalPage_history) {
      if (walkerWalkHistory.length >= 5) dispatch(getWalkerWalkHistory(page));
    }
  };

  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchMoreData();
  }, [inView]);

  useEffect(() => {
    if (walkerWalkHistory || !walkerWalkHistory) dispatch(resetWalkerWalk());
    dispatch(getWalkerWalkHistory(1));
  }, []);

  if (!walkerWalkHistory) return <div></div>;

  return (
    <div className="container bg-gray v2">
      <Header
        pageTitle={`${walkerWalkHistory[0]?.walker?.walkerName}님의 지난 산책 내역`}
        link={"/walkerMain"}
      />
      {walkerWalkHistory.length !== 0 ? (
        <List>
          {walkerWalkHistory?.map((el, idx) => {
            return (
              <li
                onClick={() => {
                  navigate(`/walking/${el.walkId}`);
                }}
              >
                <WalkerWalkListCard el={el} />
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
export default WalkerWalkHistory;

const List = styled.ul`
  padding: 5px 0 40px;
  li + li {
    margin-top: 20px;
  }
`;

const Scroll = styled.div`
  height: 200px;
`;
