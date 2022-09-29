import customAxios from "../axiosAPI";

export const GET_PET_WALK_HISTORY_SUCCESS = "GET_PET_WALK_HISTORY_SUCCESS";
export const GET_PET_WALK_PENDING_SUCCESS = "GET_PET_WALK_PENDING_SUCCESS";
export const PET_WALK_LOADING = "PET_WALK_LOADING";

export const getPetWalkInfo = (petId, page) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "PET_WALK_LOADING",
        payload: {
          petWalkLoading: true
        }
      });
      const getPetWalkInfoApi = await customAxios.get(
        `walk/walkHistory?page=${page}&petId=${petId}`
      );
      dispatch({
        type: "GET_PET_WALK_HISTORY_SUCCESS",
        payload: {
          petWalkInfo: getPetWalkInfoApi.data.items,
          totalPage_history: getPetWalkInfoApi.data.page.totalElements
        }
      });
      dispatch({
        type: "PET_WALK_LOADING",
        payload: {
          petWalkLoading: false
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const getPetWalkPendingInfo = (petId, page) => {
  return async (dispatch) => {
    try {
      const getPetWalkInfoPendingApi = await customAxios.get(
        `/walk/walkWaiting?page=${page}&petId=${petId}`
      );
      dispatch({
        type: "GET_PET_WALK_PENDING_SUCCESS",
        payload: {
          petWalkPendingInfo: getPetWalkInfoPendingApi.data.items,
          totalPage_pending: getPetWalkInfoPendingApi.data.totalElements
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};
