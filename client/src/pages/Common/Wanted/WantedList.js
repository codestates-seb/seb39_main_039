import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import WantedCard from "../../../components/WantedCard";
import { SwitchButton } from "../../../components/Switch";
import { FloatingBtnAdd } from "../../../components/Button/FloatingBtn";
import DropDown from "../../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { getAllWantedList } from "../../../redux/actions/wantedActions";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useInfinteScroll } from "../../../hooks/useInfiniteScroll";
import { getScrollAllWantedList } from "../../../redux/actions/wantedActions";

import { useInView } from "react-intersection-observer";
import { set } from "date-fns";

const WantedList = () => {
  const { allWantedList, loading, scrollAllWantedList } = useSelector(
    (state) => state.wanted
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ref, inView] = useInView();

  const [target, setTarget] = useState(null);
  const [isOn, setIsOn] = useState(false);
  const [matchedToggle, setMatchedToggle] = useState(false);
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedLocation, setSelectedLocation] = useState("서울시 강동구");
  const [page, setPage] = useState(1);

  const [scroll, setScroll] = useState(false);
  // console.log(page);
  // //////

  // ///////

  let sortOption, checked;

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

  useEffect(() => {
    dispatch(getAllWantedList("pay", `경기도 수원시`, false, 1));
    console.log("??????");
  }, []);

  useEffect(() => {
    if (
      scrollAllWantedList.length < allWantedList.page?.totalElements &&
      inView
    ) {
      setScroll(true);
      setPage(page + 1);
      navigate(
        `/wantedList?sort=${sortOption}&location=${selectedLocation}&matched=${isOn}&page=${page}`
      );
      dispatch(getScrollAllWantedList("pay", `경기도 수원시`, false, page));

      console.log("scroll", scroll);
      console.log("inView", inView);
    }
  }, [inView]);

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
      {loading ? (
        <Loading>
          <ThreeDots color="#3183f8" height={80} width={80} />
        </Loading>
      ) : (
        <>
          {scroll ? (
            <WantedCardList>
              {scrollAllWantedList?.map((item) => (
                <WantedCard key={item.id} item={item} />
              ))}
              <FloatingBtnAdd mid={"wantedCreate"} />
            </WantedCardList>
          ) : (
            <WantedCardList>
              {allWantedList.items?.map((item) => (
                <WantedCard key={item.id} item={item} />
              ))}
              <FloatingBtnAdd mid={"wantedCreate"} />
            </WantedCardList>
          )}
        </>
      )}
      {loading ? (
        <Loading>
          <ThreeDots color="#3183f8" height={80} width={80} />
        </Loading>
      ) : (
        <Scroll ref={ref}></Scroll>
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
  height: 100vh;
`;

const Scroll = styled.div`
  height: 200px;
`;
