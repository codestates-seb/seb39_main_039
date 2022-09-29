import { customAxios } from "../axiosAPI";

// 로그인이 성공했을 때 행동 (액션타입)
export const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";
export const GET_WALK_STATE_SUCCESS = "GET_WALK_STATE_SUCCESS";
export const GET_WALK_DETAIL_INFO_SUCCESS = "GET_WALK_DETAIL_INFO_SUCCESS";
export const CLOSE_WALK_SUCCESS = "CLOSE_WALK_SUCCESS";

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

export const sendLocation = (lat, lon, distance) => {
  return async () => {
    try {
      const sendLocationAPI = customAxios.put(`/walk/1/coord`, {
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
