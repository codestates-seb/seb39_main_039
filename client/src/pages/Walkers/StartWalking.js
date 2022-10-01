import styled from "styled-components";
import { HeaderConfirm } from "../../components/Layout/Header";
import TrackingMap from "../../components/Map/TrackingMap";
import { DogNameLabel } from "../../components/DogNameLabel";
import { CheckingList } from "../../components/CheckListView";
import { StateCheckCard } from "../../components/StateCard";
import sampleImg from "../../assets/img/sample-img.png";
import { Checkbox } from "../../components/Inputs/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import uploadPhoto from "../../assets/img/uploadPhoto.svg";

import {
  getWalkDetailInfo,
  changeCheckListState,
  countPoo,
  getWalkingPetPicture,
  addWalkingPetPicture,
  deleteWalkingPetPicture
} from "../../redux/actions/mappingAction";
import { useParams } from "react-router-dom";

const StartWalking = () => {
  const imgRef = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { walkDetailInfo, walkingPetPicture } = useSelector(
    (state) => state.mapping
  );
  const [walkCount, setWalkCount] = useState();
  const [pooCount, setPooCount] = useState();
  const [mealCount, setMealCount] = useState();
  const [snackCount, setSnackCount] = useState();
  const [progress, setProgress] = useState();
  const [imageUrl, setImageUrl] = useState([]);
  const [imgFile, setImgFile] = useState([]);

  const CountHandlerPlus = (walkId, toDo, count) => {
    dispatch(countPoo(walkId, toDo, count)).then((res) => {
      if (toDo === "poo") setPooCount(res.data);
      if (toDo === "walk") setWalkCount(res.data);
      if (toDo === "snack") setSnackCount(res.data);
      if (toDo === "meal") setMealCount(res.data);
    });
  };

  const CountHandlerMinus = (walkId, toDo, count) => {
    dispatch(countPoo(walkId, toDo, count)).then((res) => {
      if (toDo === "poo") setPooCount(res.data);
      if (toDo === "walk") setWalkCount(res.data);
      if (toDo === "snack") setSnackCount(res.data);
      if (toDo === "meal") setMealCount(res.data);
    });
  };

  const change = (curState, checkList_id) => {
    dispatch(changeCheckListState(id, checkList_id, curState)).then((res) =>
      setProgress(res.data.progress)
    );
  };

  const onChangeImage = () => {
    setImgFile(imgRef.current.files[0]); // -> put 요청
    setImageUrl(URL.createObjectURL(imgRef.current.files[0]));
    window.URL.revokeObjectURL(imgRef.current.files[0]);
  };

  const forUpLoadPhoto = (e) => {
    imgRef.current.click();
  };

  const uploadPicture = async () => {
    await dispatch(addWalkingPetPicture(id, imgFile));
    await dispatch(getWalkingPetPicture(id))
      .then(() => setImageUrl([]))
      .then(() => setImgFile([]));
  };

  const deletePicture = async (picture) => {
    await dispatch(deleteWalkingPetPicture(id, picture));
    await dispatch(getWalkingPetPicture(id));
  };

  useEffect(() => {
    dispatch(getWalkingPetPicture(id));
  }, []);

  useEffect(() => {
    uploadPicture();
  }, [imageUrl.includes("blob")]);

  useEffect(() => {
    dispatch(getWalkDetailInfo(id)).then((res) => {
      setPooCount(res.data.pooCount);
      setSnackCount(res.data.snackCount);
      setWalkCount(res.data.walkCount);
      setMealCount(res.data.mealCount);
      setProgress(res.data.progress);
    });
  }, []);

  return (
    <div className="container pa0 v2">
      <Section>
        <HeaderConfirm pageTitle={"진행중인 산책"} />
        <div className="walk-team">
          <dl className="walk-con">
            <dt>산책견</dt>
            <dd>
              {walkDetailInfo.petList?.map((el, idx) => (
                <DogNameLabel
                  size={"xs"}
                  species={el.species}
                  name={el.petName}
                  key={idx}
                  picture={el.petPicture}
                />
              ))}
            </dd>
          </dl>
          <dl className="walk-con">
            <dt>산책 예정시간</dt>
            <dd>
              ~{" "}
              {new Date(walkDetailInfo.endTime + "z")
                .toLocaleString()
                .slice(0, -3)}{" "}
              까지
            </dd>
          </dl>
        </div>
      </Section>
      <Sect className="map-area">
        <TrackingMap />
        <div className="stata-area">
          <StateBoxArea className="pt25">
            <li>
              <StateCheckCard
                type={"i1"}
                name={"산책"}
                count={walkCount}
                CountHandlerPlus={() => {
                  CountHandlerPlus(walkDetailInfo.walkId, "walk", 1);
                }}
                CountHandlerMinus={() => {
                  CountHandlerMinus(walkDetailInfo.walkId, "walk", -1);
                }}
              />
            </li>
            <li>
              <StateCheckCard
                type={"i2"}
                name={"배변"}
                count={pooCount}
                CountHandlerPlus={() => {
                  CountHandlerPlus(walkDetailInfo.walkId, "poo", 1);
                }}
                CountHandlerMinus={() => {
                  CountHandlerMinus(walkDetailInfo.walkId, "poo", -1);
                }}
              />
            </li>
          </StateBoxArea>
          <StateBoxArea>
            <li>
              <StateCheckCard
                type={"i3"}
                name={"식사"}
                count={mealCount}
                CountHandlerPlus={() => {
                  CountHandlerPlus(walkDetailInfo.walkId, "meal", 1);
                }}
                CountHandlerMinus={() => {
                  CountHandlerMinus(walkDetailInfo.walkId, "meal", -1);
                }}
              />
            </li>
            <li>
              <StateCheckCard
                type={"i4"}
                name={"간식"}
                count={snackCount}
                CountHandlerPlus={() => {
                  CountHandlerPlus(walkDetailInfo.walkId, "snack", 1);
                }}
                CountHandlerMinus={() => {
                  CountHandlerMinus(walkDetailInfo.walkId, "snack", -1);
                }}
              />
            </li>
          </StateBoxArea>
        </div>
      </Sect>
      <Sect>
        <div className="d-flex">
          <label htmlFor="" className="ipt-label">
            체크리스트
          </label>
          <em>수행률 {progress}%</em>
        </div>
        <CheckingList>
          {walkDetailInfo.checkList?.map((el) => (
            <li>
              <Checkbox
                text={el.content}
                func={change}
                id={el.checkListId}
                checking={el.checked}
              />
            </li>
          ))}
        </CheckingList>
      </Sect>
      <Sect>
        <label htmlFor="" className="ipt-label">
          사진 보관함
        </label>
        <ul className="list-horizonscroll">
          <input
            type="file"
            accept="image/*"
            onChange={onChangeImage}
            ref={imgRef}
            style={{ display: "none" }}
            multiple
          />
          <UserPhoto>
            {/* <span className="upload-photo" onClick={uploadPicture}>
              +
            </span> */}
            <input
              type="file"
              accept="image/*"
              onChange={onChangeImage}
              ref={imgRef}
              style={{ display: "none" }}
              multiple
              className="user-photo"
            />
            <img
              src={imageUrl.length !== 0 ? imageUrl : uploadPhoto}
              className="user-photo pre-load"
              onClick={forUpLoadPhoto}
            />

            {walkingPetPicture?.map((item) => (
              <span>
                <img src={item} className="user-photo" />
                <i className="user-edit" onClick={() => deletePicture(item)}>
                  <FontAwesomeIcon icon={faEraser} />
                </i>
              </span>
            ))}
          </UserPhoto>
        </ul>
      </Sect>
    </div>
  );
};

export default StartWalking;

const Section = styled.section`
  border-bottom: 9px solid var(--gray-100);
  padding: 0 20px 0 20px;
  background: var(--white-000);

  .walk-team {
    margin: 15px 0;

    .walk-con {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      > dt {
        position: relative;
        min-width: 60px;
        font-weight: 600;
        padding-right: 18px;
        line-height: 30px;
      }
      > dt:before {
        content: "";
        position: absolute;
        right: 7px;
        top: 50%;
        transform: translate(0, -50%);
        display: inline-block;
        width: 3px;
        height: 3px;
        background: var(--gray-200);
        border-radius: 10px;
      }
      > dd {
        span {
          margin-right: 5px;
        }
        p {
          line-height: 30px;
        }
      }
    }

    .walk-con.v2 {
      margin-bottom: 20px;
    }
  }
`;

const Sect = styled.section`
  margin: 0 20px;
  padding: 30px 0;
  border-bottom: 1px solid var(--gray-200);

  &.map-area {
    padding: 0;
    margin: 0;
    border-bottom: 0;

    .stata-area {
      padding-bottom: 30px;
      margin: 0 20px 10px;
      border-bottom: 1px solid var(--gray-200);
    }
  }
`;

const StateBoxArea = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0 0 8px;
  gap: 8px;

  > li {
    width: 50%;
  }
`;

const UserPhoto = styled.li`
  display: inline-block;
  position: relative;
  margin-bottom: 13px;

  > span {
    position: relative;
  }

  .upload-photo {
    cursor: pointer;
    position: absolute;
    left: 85px;
    bottom: -3px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 35px;
    background: var(--info);
    border: 3px solid var(--white-000);
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    border-radius: 30%;
    color: var(--white-000);
    :hover {
      transition: 400ms;
      background: var(--white-000);
      color: var(--info);
    }
    z-index: 99;
  }

  .user-photo {
    cursor: pointer;
    width: 120px;
    height: 120px;
    border-radius: 10px;
    margin-right: 10px;

    :hover {
      transition: 500ms;
      transform: scale(1.03);
    }
  }

  .user-edit {
    cursor: pointer;
    position: absolute;
    right: -7px;
    bottom: -3px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    background: var(--gray-100);
    border: 3px solid var(--white-000);
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    border-radius: 50%;

    svg {
      color: var(--gray-800);
    }
  }
`;
