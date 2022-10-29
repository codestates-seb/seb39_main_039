import { recommendAxios } from "../axiosAPI";

export const GET_RECOMMEND_REQUEST = "GET_RECOMMEND_REQUEST";
export const GET_RECOMMEND_DATA = "GET_RECOMMEND_DATA";
export const GET_LOCATION_DATA = "GET_LOCATION_DATA";
export const GET_LOCATION_REQUEST = "GET_LOCATION_REQUEST";
export const GET_RECOMMEND_SUCCESS = "GET_RECOMMEND_SUCCESS";

export const getRecommendData = (lat, lon) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_RECOMMEND_REQUEST",
        payload: {
          recommendLoading: true,
        },
      });
      const getRecommendAPI = recommendAxios.get(
        `/v2/local/search/keyword.json?y=${lat}&x=${lon}&radius=20000&query=애견카페`
      );
      let get_Recommend = await getRecommendAPI;
      dispatch({
        type: "GET_RECOMMEND_DATA",
        payload: {
          recommendData: get_Recommend.data,
        },
      });
      dispatch({
        type: "GET_RECOMMEND_SUCCESS",
        payload: {
          recommendLoading: false,
        },
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const getLocation = (lat, lon) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GET_LOCATION_REQUEST",
        payload: {
          locationLoading: true,
        },
      });
      const getLocationAPI = recommendAxios.get(
        `/v2/local/geo/coord2address.json?y=${lat}&x=${lon}`
      );
      let get_location = await getLocationAPI;
      dispatch({
        type: "GET_LOCATION_DATA",
        payload: {
          location: get_location.data,
          locationLoading: false,
        },
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};
