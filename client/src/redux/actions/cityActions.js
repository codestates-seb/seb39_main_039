import customAxios from "../axiosAPI";

export const GET_CITY_INFO_SUCCESS = "GET_CITY_INFO_SUCCESS";

export const getCityInfo = (regionName) => {
    return async (dispatch) => {
      try {
        const getCityInfoAPI = customAxios.get(`/city/${regionName}`);
        let get_cityInfo = await getCityInfoAPI;
        dispatch({
          type: "GET_CITY_INFO_SUCCESS",
          payload: {
            cityInfo: get_cityInfo.data
          }
        });
      } catch (error) {
        //에러 핸들링 하는 곳
        console.log(error);
      }
    };
  };