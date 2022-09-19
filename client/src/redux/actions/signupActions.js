import axiosAPI from "../axiosAPI";


export const JOIN_SUCCESS = "JOIN_SUCCESS";
export const JOIN_ERROR = "JOIN_ERROR";

export const JoinSuccess = (email, nickName, password) => {
    return async (dispatch) => {
    try {
        const postInfo = axiosAPI.post(`/user/signUp`, {
           email: email,
           nickName: nickName,
           password: password
        })
        .then(() => {
            dispatch({
                type: "JOIN_SUCCESS",
            })
        })
        .then((res) => window.location.replace('/login'));
        let post_info = await postInfo;
        } catch (error) {
            if (error.response.status === 422) {
            dispatch({
                type: "JOIN_ERROR",
                payload : '이메일 혹은 닉네임이 이미 사용중입니다.'
            })
            return error.response.data
          }
        }
    };
}