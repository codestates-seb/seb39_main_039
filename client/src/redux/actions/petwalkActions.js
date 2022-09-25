import customAxios from "../axiosAPI";

export const GET_PET_WALK_HISTORY_SUCCESS = "GET_PET_WALK_HISTORY_SUCCESS";
export const GET_PET_WALK_PENDING_SUCCESS = "GET_PET_WALK_PENDING_SUCCESS";

export const getPetWalkInfo = (petId) => {
    return async (dispatch) => {
      try {
        const getPetWalkInfoApi = customAxios.get(`/walk/walkHistory?petId=${petId}&page=1`);
        let get_PetWalkInfo = await getPetWalkInfoApi;
        dispatch({
          type: "GET_PET_WALK_HISTORY_SUCCESS",
          payload: {
            petWalkInfo: get_PetWalkInfo.data
          }
        });
      } catch (error) {
        //에러 핸들링 하는 곳
        console.log(error);
      }
    };
};
  
export const getPetWalkPendingInfo = (petId) => {
  return async (dispatch) => {
    try {
      const getPetWalkInfoPendingApi = customAxios.get(`/walk/walkHistory?petId=${petId}&page=1`);
      let get_PetWalkPendingInfo = await getPetWalkInfoPendingApi;
      dispatch({
        type: "GET_PET_WALK_PENDING_SUCCESS",
        payload: {
          petWalkPendingInfo: get_PetWalkPendingInfo.data
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};