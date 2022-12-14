import { customAxios } from "../axiosAPI";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toast";

export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const PUT_USER_SUCCESS = "PUT_USER_SUCCESS";
export const USER_LOADING = "USER_LOADING";
export const GET_WALKER_USER_INFO = "GET_WALKER_USER_INFO";
export const USER_PICTURE_DELETE_SUCCESS = "USER_PICTURE_DELETE_SUCCESS";
export const PUT_USER_INFO_ERROR = "PUT_USER_INFO_ERROR"

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
        })
      // .then((res) => window.location.reload());
    } catch (error) {
      toast.error("휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.");
    }
  };
};

export const saveUserPicture = (picture) => {
  return async () => {
    try {
      if (picture)
        return await customAxios
          .get(`user/saveProfileImage`)
          .then((res) => axios.put(res.data, picture))
    } catch (error) {
      console.log(error);
    }
  };
};

export const delUserPicture = () => {
  return async (dispatch) => {
    try {
      return await customAxios.delete(`user/deleteProfileImage`).then(() => {
        dispatch({
          type: "USER_PICTURE_DELETE_SUCCESS",
          payload: {
            sign: true
          }
        });
      });
    } catch (error) {
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
