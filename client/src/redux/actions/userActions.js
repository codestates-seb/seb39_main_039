import customAxios from "../axiosAPI";
import Cookies from "js-cookie";
import { toast } from "react-toast";

export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const USER_LOADING = "USER_LOADING";
export const GET_WALKER_USER_INFO = "GET_WALKER_USER_INFO";

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
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_LOADING",
        payload: {
          loading: true
        }
      });
      return await customAxios
        .put(`/user/editDefault`, {
          fullName: `${fullName}`,
          phone: `${phone}`,
          nickName: `${nickName}`
        })
        .then(() => {
          dispatch({
            type: "USER_LOADING",
            payload: {
              loading: false
            }
          });
          toast.success("수정이 완료 되었어요");
        });
      // .then((res) => window.location.reload());
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
        .then(() => {
          Cookies.remove("access");
          Cookies.remove("refresh");
          dispatch({
            type: "LOGOUT_SUCCESS"
          });
        })
        .then((res) => window.location.replace("/"));
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};

export const getWalkerUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_LOADING",
        payload: {
          loading: true
        }
      });
      const get_walkerUserAPI = customAxios.get(`/walker`);
      let get_walkerUserInfo = await get_walkerUserAPI;
      dispatch({
        type: "GET_WALKER_USER_INFO",
        payload: {
          walkerUserInfo: get_walkerUserInfo.data
        }
      });
      dispatch({
        type: "USER_LOADING",
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
