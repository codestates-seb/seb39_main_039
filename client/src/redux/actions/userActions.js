import customAxios from "../axiosAPI";

export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";

export const getUserInfo = () => {
  return async (dispatch) => {
    try {
      const getUserInfoAPI = customAxios.get(`/user/myInfo`);
      let get_userInfo = await getUserInfoAPI;
      dispatch({
        type: "GET_USER_INFO_SUCCESS",
        payload: {
          userInfo: get_userInfo.data
        }
      });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};