import customAxios from "../axiosAPI";
import { toast } from "react-toast";
import { useCallback, useEffect, useRef, useState } from "react";

export const GET_ALL_WANTED_LIST_SUCCESS = "GET_ALL_WANTED_LIST_SUCCESS";
export const GET_SCROLL_ALL_WANTED_LIST_SUCCESS =
  "GET_SCROLL_ALL_WANTED_LIST_SUCCESS";
export const GET_WANTED_DETAIL_SUCCESS = "GET_WANTED_DETAIL_SUCCESS";
export const POST_WANTED_SUCCESS = "POST_WANTED_SUCCESS";
export const WANTED_LOADING = "WANTED_LOADING";

export const getAllWantedList = (sort, location, matched, page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "WANTED_LOADING",
        payload: {
          loading: true
        }
      });
      const get_AllWantedList = await customAxios.get(
        `/wanted?sort=${sort}&location=${location}&matched=${matched}&page=${page}`
      );

      dispatch({
        type: "GET_ALL_WANTED_LIST_SUCCESS",
        payload: {
          allWantedList: get_AllWantedList.data
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

export const getScrollAllWantedList = (sort, location, matched, page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "WANTED_LOADING",
        payload: {
          loading: true
        }
      });
      const get_ScrollAllWantedList = await customAxios.get(
        `/wanted?sort=${sort}&location=${location}&matched=${matched}&page=${page}`
      );

      dispatch({
        type: "GET_SCROLL_ALL_WANTED_LIST_SUCCESS",
        payload: {
          scrollAllWantedList: get_ScrollAllWantedList.data.items
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
  startTime,
  title
) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "WANTED_LOADING",
        payload: {
          loading: true
        }
      });
      return await customAxios
        .post(`/wanted/create`, {
          caution: caution,
          checkListContent: checkListContent,
          endTime: endTime,
          location: location,
          pay: pay,
          petId: petId,
          startTime: startTime,
          title: title
        })
        .then(
          dispatch({
            type: "WANTED_LOADING",
            payload: {
              loading: false
            }
          })
        );
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};
