import styled from "styled-components";
import Lottie from "lottie-react";
import { Header } from "../../components/Layout/Header";
import HistoryCard from "../../components/HistoryCard";
import { getPetWalkInfo } from "../../redux/actions/petwalkActions";
import { getMyPetInfo } from "../../redux/actions/petActions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loadinglottie } from "../..";

const WalkerHistory = () => {
  const petId = useParams();
  const dispatch = useDispatch();
  const petWalkInfo = useSelector((state) => state.petwalk.petWalkInfo);
  const myPetInfo = useSelector((state) => state.pet.myPetInfo);
  useEffect(() => {
    dispatch(getPetWalkInfo(Number(petId.id)));
    dispatch(getMyPetInfo());
  }, []);
  const petName = myPetInfo.filter((el) => el.petId === Number(petId.id));

  console.log(petWalkInfo);

  return (
    <div className="container bg-gray">
      <Header
        pageTitle={`${petName[0]?.petName} 지난 산책 내역`}
        link={"/ownerMain"}
      />
      {petWalkInfo.items?.length !== 0 ? (
        <List>
          {petWalkInfo.items?.map((el, idx) => {
            return (
              <li>
                <HistoryCard
                  startTime={el.startTime}
                  endTime={el.endTime}
                  distance={el.distance}
                  walker={el.walker}
                  key={idx}
                />
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
