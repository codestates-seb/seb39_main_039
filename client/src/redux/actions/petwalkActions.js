import customAxios from "../axiosAPI";

export const GET_PET_WALK_SUCCESS = "GET_PET_WALK_SUCCESS";

export const getPetWalkInfo = (petId) => {
    return async (dispatch) => {
      try {
        const getPetWalkInfoApi = customAxios.get(`/walk/walkList?petId=${petId}&page=1`);
        let get_PetWalkInfo = await getPetWalkInfoApi;
        dispatch({
          type: "GET_PET_WALK_SUCCESS",
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
  