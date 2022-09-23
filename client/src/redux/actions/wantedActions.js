import customAxios from "../axiosAPI";
import { toast } from "react-toast";

export const GET_ALL_WANTED_LIST_SUCCESS = "GET_ALL_WANTED_LIST_SUCCESS";
export const GET_WANTED_DETAIL_SUCCESS = "GET_WANTED_DETAIL_SUCCESS";
export const POST_WANTED_SUCCESS = "POST_WANTED_SUCCESS";
export const WANTED_LOADING = "WANTED_LOADING";

export const getAllWantedList = (sort, location, matched) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "WANTED_LOADING",
        payload: {
          loading: true
        }
      });
      const getAllWantedList = await customAxios.get(
        `/wanted?sort=${sort}&location=${location}&matched=${matched}`
      );
      dispatch({
        type: "GET_ALL_WANTED_LIST_SUCCESS",
        payload: {
          allWantedList: getAllWantedList.data
        }
      });
      dispatch({
        type: "WANTED_LOADING",
        payload: {
          loading: false
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const getWantedDetail = (wantedId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "WANTED_LOADING",
        payload: {
          loading: true
        }
      });
      const get_WantedDetail = await customAxios.get(`/wanted/${wantedId}`);
      dispatch({
        type: "GET_WANTED_DETAIL_SUCCESS",
        payload: {
          wantedDetail: get_WantedDetail.data
        }
      });
      dispatch({
        type: "WANTED_LOADING",
        payload: {
          loading: false
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const postWanted = (
  caution,
  checkListContent,
  endTime,
  location,
  pay,
  petId,
  startTime
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "WANTED_LOADING",
        payload: {
          loading: true
        }
      });
      const post_wanted = await customAxios.post(`/wanted/create`, {
        caution: caution,
        checkListContent: checkListContent,
        endTime: endTime,
        location: location,
        pay: pay,
        petId: petId,
        startTime: startTime
      });

      dispatch({
        type: "WANTED_LOADING",
        payload: {
          loading: false
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};
