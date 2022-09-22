import customAxios from "../axiosAPI";
import Cookies from "js-cookie";

export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";

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

export const editUserInfo = (fullName, phone, nickName) => {
  return async () => {
    try {
      const editUserInfoAPI = await customAxios
      .put(`/user/editDefault`, {
        fullName: `${fullName}`,
        phone: `${phone}`,
        nickName: `${nickName}`
      })
      .then((res) => window.location.reload());
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const delUser = () => {
  return async (dispatch) => {
    try {
      const delUserAPI = await customAxios
      .delete(`/user/delete`)
      .then(()=>{
        Cookies.remove("access");
        Cookies.remove("refresh");
        dispatch({
          type: "LOGOUT_SUCCESS",
        })
      })
      .then((res) => window.location.replace('/'));
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
}