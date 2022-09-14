import axiosAPI from "../axiosAPI";

// 로그인이 성공했을 때 행동 (액션타입)
export const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";

// 액션 내용 = 이게 하나의 action이당!!
export const getLocation = (lat, lon) => ({
  type: GET_LOCATION_SUCCESS,
  payload: { lat: lat, lon: lon }
});

export const sendLocation = (lat, lon) => {
  return async () => {
    try {
      const sendLocationAPI = axiosAPI.put(`/walk/1/coord`, { lat, lon });
      let send_Location = await sendLocationAPI;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log(error);
    }
  };
};
