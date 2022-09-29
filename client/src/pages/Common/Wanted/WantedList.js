import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Header } from "../../../components/Layout/Header";
import WantedCard from "../../../components/WantedCard";
import { SwitchButton } from "../../../components/Switch";
import { FloatingBtnAdd } from "../../../components/Button/FloatingBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../../../components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  getScrollAllWantedList,
  resetScrollAllWantedList
} from "../../../redux/actions/wantedActions";
import { useInView } from "react-intersection-observer";
import CitySelect from "../../../components/CitySelect";
import { useNavigate } from "react-router-dom";
import { getMyPetInfo } from "../../../redux/actions/petActions";

const WantedList = () => {
  const { myPetInfo } = useSelector((state) => state.pet);
  const { scrollAllWantedList, totalPage } = useSelector(
    (state) => state.wanted
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regionRef = useRef(); //선택 후 지역 인풋 포커싱

  const [isOn, setIsOn] = useState(false);
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false); // 지역 모달창 여닫기
  const [region, setRegion] = useState(""); //지역 id받아오는 state
  const [regionName, setRegionName] = useState(""); // 지역 이름 담기
  const [regionNamePick, setRegionNamePick] = useState("동네 설정"); //지역이름 선택 하면! input값으로 넣기

  const cityModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const regionConfirmHandler = () => {
    setRegionNamePick(regionName);
    setIsOpen(false);
    document.body.style.overflow = "unset";
    regionRef.current.focus();
  };

  const { ref, inView } = useInView({
    threshold: 0.7
  });

  let sortOption;

  const toggleHandler = () => {
    setIsOn(!isOn);
  };

  const sortData = [{ name: "최신순" }, { name: "보수순" }];

  if (selectedSort === "최신순") {
    sortOption = "recent";
  } else {
    sortOption = "pay";
  }

  const fakeFetch = (delay = 300) =>
    new Promise((res) => setTimeout(res, delay));

  const fetchMoreData = async () => {
    setPage(page + 1);
    await fakeFetch();
    if (scrollAllWantedList.length < totalPage) {
      if (scrollAllWantedList.length > 9)
        dispatch(getScrollAllWantedList(sortOption, region, isOn, page));
    }
  };
  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchMoreData();
  }, [inView]);

  useEffect(() => {
    if (sortOption || isOn || region || !sortOption || !isOn || !region)
      dispatch(resetScrollAllWantedList());
    dispatch(getScrollAllWantedList(sortOption, region, isOn, 1));
    setPage(1);
  }, [sortOption, isOn, region]);

  useEffect(() => {
    if (scrollAllWantedList || !scrollAllWantedList)
      dispatch(resetScrollAllWantedList());
    // dispatch(getScrollAllWantedList("", "", "", 1));
    dispatch(getMyPetInfo());
  }, []);

  console.log(scrollAllWantedList, page, totalPage);

  return (
    <div className="container bg-gray v2">
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
            <span className="cate" onClick={cityModal}>
              <FontAwesomeIcon icon={faLocationDot} /> {regionNamePick}{" "}
              <i className="ico-caret"></i>
            </span>
          </li>
          <li>
            <DropDown
              name={selectedSort}
              data={sortData}
              setSelectedSort={setSelectedSort}
              value={"sortData"}
            />
          </li>
        </ul>
        <SwitchGroup>
          <em>매칭 글 제외</em>
          <SwitchButton isOn={isOn} toggleHandler={toggleHandler} />
        </SwitchGroup>
      </ListFilter>

      <WantedCardList>
        {scrollAllWantedList?.map((item, idx) => (
          <WantedCard key={idx} item={item} />
        ))}

        <span
          onClick={() =>
            myPetInfo.length === 0 ? navigate(`/dogEditAdd`) : ""
          }
        >
          <FloatingBtnAdd
            mid={myPetInfo.length === 0 ? "wantedList" : "wantedCreate"}
          />
        </span>
      </WantedCardList>

      <Scroll ref={ref}></Scroll>
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

    .cate {
      position: relative;
      padding-right: 13px;

      svg {
        font-size: 14px;
        color: var(--gray-600);
      }

      .ico-caret {
        display: inline-block;
        border-top: 4px solid #333;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -2px;
      }
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

const Scroll = styled.div`
  height: 200px;
`;
