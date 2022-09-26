import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import WantedCard from "../../../components/WantedCard";
import { SwitchButton } from "../../../components/Switch";
import { FloatingBtnAdd } from "../../../components/Button/FloatingBtn";
import DropDown from "../../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllWantedList,
  getScrollAllWantedList,
  resetScrollAllWantedList
} from "../../../redux/actions/wantedActions";
import { useInView } from 'react-intersection-observer';

const WantedList = () => {
  const { scrollAllWantedList, totalPage } = useSelector(
    (state) => state.wanted
  );
  const dispatch = useDispatch();
  const search = useLocation();

  const [isOn, setIsOn] = useState(false);
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedLocation, setSelectedLocation] = useState("경기도 수원시");
  const [page, setPage] = useState(2);
  const [option, setOption] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.7
  });

  let sortOption;

  const toggleHandler = () => {
    setIsOn(!isOn);
  };

  const sortData = [{ name: "최신순" }, { name: "보수순" }];
  const sortData2 = [{ name: "서울시 강동구" }, { name: "경기도 수원시" }];

  if (selectedSort === "최신순") {
    sortOption = "recent";
  } else {
    sortOption = "pay";
  }

  const fakeFetch = (delay = 300) =>
    new Promise((res) => setTimeout(res, delay));

  const fetchMoreData = async () => {
    setOption(false);
    await fakeFetch();
    if (scrollAllWantedList.length < totalPage) {
      dispatch(getScrollAllWantedList(sortOption, "", isOn, page)).then(
        setPage(page + 1)
      );
    }
  };

  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchMoreData();
  }, [inView]);

  useEffect(() => {
    dispatch(resetScrollAllWantedList());
    setOption(true);
    setPage(1);
  }, [sortOption, isOn]);

  useEffect(() => {
    dispatch(getScrollAllWantedList(sortOption, "", isOn, 1));
  }, []);

  return (
    <div className="container bg-gray">
      <Header pageTitle={"구인글 리스트"} useRight="on" />
      <ListFilter>
        <ul className="sort-group">
          <li>
            <DropDown
              name={selectedSort}
              data={sortData}
              setSelectedSort={setSelectedSort}
              value={"sortData"}
            />
          </li>
          <li>
            <DropDown
              name={selectedLocation}
              data={sortData2}
              setSelectedLocation={setSelectedLocation}
              value={"sortData2"}
            />
          </li>
        </ul>
        <SwitchGroup>
          <em>매칭 된 글 제외</em>
          <SwitchButton isOn={isOn} toggleHandler={toggleHandler} />
        </SwitchGroup>
      </ListFilter>
      {option ? (
        <WantedCardList>
          {scrollAllWantedList?.map((item, idx) => (
            <WantedCard key={idx} item={item} />
          ))}
          <FloatingBtnAdd mid={"wantedCreate"} />
          <Scroll ref={ref}></Scroll>
        </WantedCardList>
      ) : (
        <WantedCardList>
          {scrollAllWantedList?.map((item, idx) => (
            <WantedCard key={idx} item={item} />
          ))}
          <FloatingBtnAdd mid={"wantedCreate"} />
          <Scroll ref={ref}></Scroll>
        </WantedCardList>
      )}
    </div>
  );
};

export default WantedList;

const ListFilter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  margin: 15px 0 10px;
  .sort-group {
    display: flex;
    gap: 10px;
  }
`;

const WantedCardList = styled.div`
  > div {
    margin: 8px 0;
  }
`;

const SwitchGroup = styled.div`
  display: flex;
  align-items: center;
  font-family: "Pretendard-Medium";
  gap: 5px;
`;

const Loading = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Scroll = styled.div`
  height: 200px;
`;