import axiosAPI from "../axiosAPI";
import Cookies from "js-cookie";

// 로그인이 성공했을 때 행동 (액션타입)
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

// 액션 내용 = 이게 하나의 action이당!! 
export const loginSuccess = (email, password) => {
    return async (dispatch) => {
    try {
        dispatch({
            type: "LOGIN_SUCCESS",
        })
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
        // .then((res) => window.location.replace('/'));
        .then((res) => window.location.replace('/'));
        let post_user = await postUser;
        } catch (error) {
            if (error.response.status === 401) {
            dispatch({
                type: "LOGIN_ERROR",
                payload : '이메일 혹은 패스워드가 틀립니다.'
            })
          }
        }
    };
  };




  