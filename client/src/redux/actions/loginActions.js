// 로그인이 성공했을 때 행동 (액션타입)
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

// 액션 내용 = 이게 하나의 action이당!! 
export const loginSuccess = (id) => ({
    type:LOGIN_SUCCESS,
    payload : id
})

export const logoutSuccess = () => ({
    type:LOGOUT_SUCCESS
})