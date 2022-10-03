import { customAxios } from "../axiosAPI";

export const GET_WALKER_WALK_HISTORY_SUCCESS =
  "GET_WALKER_WALK_HISTORY_SUCCESS";
export const GET_WALKER_WALK_WAITING_SUCCESS =
  "GET_WALKER_WALK_WAITING_SUCCESS";
export const RESET_WALKER_SUCCESS = "RESET_WALKER_SUCCESS";
export const WALKER_LOADING = "WALKER_LOADING";

export const getWalkerWalkHistory = (page) => {
  return async (dispatch) => {
    try {
      const getWalkerWalkHistory = await customAxios.get(
        `/walk/walkHistory?page=${page}`
      );
      dispatch({
        type: "GET_WALKER_WALK_HISTORY_SUCCESS",
        payload: {
          walkerWalkHistory: getWalkerWalkHistory.data.items,
          totalPage_history: getWalkerWalkHistory.data.page.totalElements
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const getWalkerWalkWaiting = (page) => {
  return async (dispatch) => {
    try {
      const getWalkerWalkWaiting = await customAxios.get(
        `/walk/walkWaiting?page=${page}`
      );
      dispatch({
        type: "GET_WALKER_WALK_WAITING_SUCCESS",
        payload: {
          walkerWalkWaiting: getWalkerWalkWaiting.data.items,
          totalPage_waiting: getWalkerWalkWaiting.data.page.totalElements
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const resetWalkerWalk = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "RESET_WALKER_SUCCESS",
        payload: {
          walkerWalkHistory: [],
          walkerWalkWaiting: []
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};
