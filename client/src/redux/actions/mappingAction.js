import { customAxios } from "../axiosAPI";
import axios from "axios";

// 로그인이 성공했을 때 행동 (액션타입)
export const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";
export const GET_WALK_STATE_SUCCESS = "GET_WALK_STATE_SUCCESS";
export const GET_WALK_DETAIL_INFO_SUCCESS = "GET_WALK_DETAIL_INFO_SUCCESS";
export const CLOSE_WALK_SUCCESS = "CLOSE_WALK_SUCCESS";
export const GET_WALKING_PET_PICTURE = "GET_WALKING_PET_PICTURE";

//로딩 관련/////////////////////////////////////////////////////
export const GET_LOCATION_REQUEST = "GET_LOCATION_REQUEST";
//////////////////////////////////////////////////////////////

// 액션 내용 = 이게 하나의 action이당!!
export const getLocation = (lat, lon) => ({
  type: GET_LOCATION_SUCCESS,
  payload: { lat: lat, lon: lon, loading: false }
});

export const walkState = (walk) => ({
  type: "GET_WALK_STATE_SUCCESS",
  payload: { isWalk: walk }
});

export const getWalkDetailInfo = (walkerId) => {
  return async (dispatch) => {
    try {
      const getWalkDetailInfoApi = customAxios
        .get(`/walk/${walkerId}`)
        .then((res) => {
          return res;
        });
      let get_WalkDetailInfoApi = await getWalkDetailInfoApi;
      dispatch({
        type: "GET_WALK_DETAIL_INFO_SUCCESS",
        payload: {
          walkDetailInfo: get_WalkDetailInfoApi.data
        }
      });
      return getWalkDetailInfoApi;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const closeWalk = (walkerId) => {
  return async (dispatch) => {
    try {
      const getCloseWalkApi = customAxios
        .put(`/walk/${walkerId}/end`)
        .then((res) => window.location.replace("/walkerMain"));
      let get_closeWalkApi = await getCloseWalkApi;
      dispatch({
        type: "CLOSE_WALK_SUCCESS",
        payload: {
          closeWalklInfo: get_closeWalkApi.data
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const sendLocation = (lat, lon, distance, id) => {
  return async () => {
    try {
      const sendLocationAPI = customAxios.put(`/walk/${id}/coord`, {
        coord: `${lat} ${lon}`,
        distance: `${distance}`
      });
      let send_Location = await sendLocationAPI;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const changeCheckListState = (walkId, checkListId, done) => {
  return async (dispatch) => {
    try {
      return await customAxios.put(
        `/walk/${walkId}/check/${checkListId}`,
        `${done}`
      );
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const countPoo = (walkId, basic, count) => {
  return async () => {
    try {
      return await customAxios.put(`/walk/${walkId}/${basic}`, count);
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const actualWalkTime = (walkId, walkTime) => {
  return async () => {
    try {
      return await customAxios
        .put(`/walk/${walkId}/actualWalkTime`, walkTime)
        .then((res) => window.location.replace("/walkerMain"));
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const addWalkingPetPicture = (walkId, picture) => {
  return async () => {
    try {
      if (picture.length !== 0)
        return await customAxios
          .get(`walk/${walkId}/savePicture`)
          .then((res) => axios.put(res.data, picture));
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};

export const getWalkingPetPicture = (walkId) => {
  return async (dispatch) => {
    try {
      const getWalkingPetPictureApi = customAxios.get(
        `/walk/${walkId}/pictureList`
      );
      let getWalkingPetPic = await getWalkingPetPictureApi;
      dispatch({
        type: "GET_WALKING_PET_PICTURE",
        payload: {
          walkingPetPicture: getWalkingPetPic.data
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteWalkingPetPicture = (walkId, picture) => {
  return async () => {
    try {
      return await customAxios.delete(`/walk/${walkId}/deletePicture`, {
        data: { link: picture }
      });
    } catch (error) {
      console.log(error);
    }
  };
};
