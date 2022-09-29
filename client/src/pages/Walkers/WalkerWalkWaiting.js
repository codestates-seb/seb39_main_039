import styled from "styled-components";
import Lottie from "lottie-react";
import { Header } from "../../components/Layout/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loadinglottie } from "../..";
import {
  getWalkerWalkWaiting,
  resetWalkerWalk
} from "../../redux/actions/walkerActions";
import WalkerWalkListCard from "../../components/WalkerWalkListCard";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const WalkerWalkWaiting = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { walkerWalkWaiting, totalPage_waiting } = useSelector(
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
    if (walkerWalkWaiting.length < totalPage_waiting) {
      if (walkerWalkWaiting.length > 5) {
        dispatch(getWalkerWalkWaiting(page));
      }
    }
  };

  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchMoreData();
  }, [inView]);

  useEffect(() => {
    if (walkerWalkWaiting || !walkerWalkWaiting) dispatch(resetWalkerWalk());
    dispatch(getWalkerWalkWaiting(1));
  }, []);

  console.log(walkerWalkWaiting, totalPage_waiting);

  if (!walkerWalkWaiting) return <div></div>;

  return (
    <div className="container bg-gray v2">
      <Header pageTitle={`대기중인 산책 내역`} />
      {walkerWalkWaiting.length !== 0 ? (
        <List>
          {walkerWalkWaiting?.map((el, idx) => {
            return (
              <li
                onClick={() => {
                  navigate(`/wantedDetail/${el.walkId}`);
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
export default WalkerWalkWaiting;

const List = styled.ul`
  padding: 5px 0 40px;
  li + li {
    margin-top: 20px;
  }
`;

const Scroll = styled.div`
  height: 200px;
`;
