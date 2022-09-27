import React, { useEffect, useState, useRef } from "react";
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
import { useInView } from "react-intersection-observer";
import CitySelect from "../../../components/CitySelect";

const WantedList = () => {
  const { scrollAllWantedList, totalPage, wantedDetail } = useSelector(
    (state) => state.wanted
  );
  const dispatch = useDispatch();
  const search = useLocation();

  const [isOn, setIsOn] = useState(false);
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedLocation, setSelectedLocation] = useState("경기도 수원시");
  const [page, setPage] = useState(1);
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

  const regionRef = useRef(); //선택 후 지역 인풋 포커싱
  const [isOpen, setIsOpen] = useState(false); // 지역 모달창 여닫기
  const cityModal = () => {
    //모달창 여닫기
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  const [region, setRegion] = useState(""); //지역 id받아오는 state
  const [regionName, setRegionName] = useState(""); // 지역 이름 담기
  const [regionNamePick, setRegionNamePick] = useState("동네 설정"); //지역이름 선택 하면! input값으로 넣기
  const regionConfirmHandler = () => {
    //지역정보 받아오기
    setRegionNamePick(regionName);
    setIsOpen(false);
    document.body.style.overflow = "unset";
    regionRef.current.focus();
  };

  const fakeFetch = (delay = 300) =>
    new Promise((res) => setTimeout(res, delay));

  const fetchMoreData = async () => {
    setOption(false);
    await fakeFetch();
    if (scrollAllWantedList.length < totalPage) {
      dispatch(getScrollAllWantedList(sortOption, region, isOn, page)).then(
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
    // if (region > 0)
    // dispatch(getScrollAllWantedList(sortOption, region, isOn, 1));
    setOption(true);
    setPage(1);
  }, [sortOption, isOn, regionNamePick]);

  useEffect(() => {
    // dispatch(resetScrollAllWantedList());
    dispatch(getScrollAllWantedList(sortOption, "", isOn, page));
  }, []);

  //region있을때에는 리셋되면 안됨

  return (
    <div className="container bg-gray">
      <Header pageTitle={"구인글 리스트"} useRight="on" />
      <CitySelect
        isOpen={isOpen} //모달 여닫기
        setIsOpen={setIsOpen} //모달 여닫기
        setRegion={setRegion} // 지역 id값 담기
        setRegionName={setRegionName} // 지역 명 담기
        confirmHandler={regionConfirmHandler} //지역 정보 받아오며 모달 닫기
      />
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
            <div className="ipt-group">
              <input
                type="text"
                className="ipt-form"
                value={regionNamePick} // 선택한 지역명 값에 담기
                ref={regionRef}
                onChange={() => console.log()} // value써서 임시로 넣은 기능없는 onChange
                onClick={cityModal}
              />
            </div>
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
    > li:first-child {
      width: 80px;
    }
  }

  .ipt-group {
    height: 40%;
  }

  > ul > li {
    display: flex;
    align-items: center;
    justify-content: center;
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
