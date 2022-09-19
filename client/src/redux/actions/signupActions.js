import axiosAPI from "../axiosAPI";


// 로그인이 성공했을 때 행동 (액션타입)
export const JOIN_SUCCESS = "JOIN_SUCCESS";

export const JoinSuccess = (email, nickName, password) => {
    // type:LOGOUT_SUCCESS
    return async () => {
    try {
        const postInfo = axiosAPI.post(`/user/signup`, {
           email: email,
           nickName: nickName,
           password: password
        })
        let post_info = await postInfo;
        } catch (error) {
        //에러 핸들링 하는 곳
        console.log("에러", error);
        }
    };
}