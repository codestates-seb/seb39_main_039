import axiosAPI from "../axiosAPI";

// 로그인이 성공했을 때 행동 (액션타입)
export const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";
export const GET_WALK_STATE_SUCCESS = "GET_WALK_STATE_SUCCESS";
export const GET_WALK_DETAIL_INFO_SUCCESS = "GET_WALK_DETAIL_INFO_SUCCESS";

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
      const getWalkDetailInfoApi = axiosAPI.get(`/walk/${walkerId}`);
      let get_WalkDetailInfoApi = await getWalkDetailInfoApi;
      dispatch({
        type: "GET_WALK_DETAIL_INFO_SUCCESS",
        payload: {
          walkDetailInfo: get_WalkDetailInfoApi.data
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
      const sendLocationAPI = axiosAPI.put(`/walk/1/coord`, {
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
