// 로그인이 성공했을 때 행동 (액션타입)
export const GET_LOCATION_SUCCESS = "GET_LOCATION_SUCCESS";

// 액션 내용 = 이게 하나의 action이당!!
export const getLocation = (lat, lon) => ({
  type: GET_LOCATION_SUCCESS,
  payload: { lat: lat, lon: lon }
});
