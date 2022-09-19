import axiosAPI from "../axiosAPI";
import Cookies from "js-cookie";

// 로그인이 성공했을 때 행동 (액션타입)
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

// 액션 내용 = 이게 하나의 action이당!! 
export const loginSuccess = (email, password) => {
    return async (dispatch) => {
    dispatch({
        type: "LOGIN_SUCCESS",
    })
    try {
        const postUser = axiosAPI.post(`/user/login`, {
           email: email,
           password: password
        }).then((response) => {
            Cookies.set("access", response.headers.access, {
              expires: 7
            });
            Cookies.set("refresh", response.headers.refresh, {
              expires: 7
            });
        })
        .then((res) => window.location.replace('/'));
        let post_user = await postUser;
        } catch (error) {
        //에러 핸들링 하는 곳
        console.log("에러", error);
        }
    };
  };




  