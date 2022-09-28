import customAxios from "../axiosAPI";
import { toast } from "react-toast";

export const GET_PET_INFO_SUCCESS = "GET_PET_INFO_SUCCESS";
export const PET_LOADING = "PET_LOADING";

export const getMyPetInfo = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "PET_LOADING",
        payload: {
          loading: true
        }
      });
      const getMyPetInfoAPI = customAxios.get(`/pet/detailList`);
      let get_myPetInfo = await getMyPetInfoAPI;
      dispatch({
        type: "GET_PET_INFO_SUCCESS",
        payload: {
          myPetInfo: get_myPetInfo.data
        }
      });
      dispatch({
        type: "PET_LOADING",
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

export const addMyPet = (name, species, birth, sex, about) => {
  return async () => {
    try {
      const addMyPetAPI = customAxios
        .post(`/pet/create`, {
          aboutPet: `${about}`,
          birthday: `${birth}`,
          name: `${name}`,
          picture:
            "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99D740415C432CC526",
          sex: `${sex}`,
          species: `${species}`
        })
        .then((res) => window.location.replace("/ownerMain"));

      let add_myPet = await addMyPetAPI;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};

export const editMyPetInfo = (petId, name, species, birth, sex, about) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "PET_LOADING",
        payload: {
          loading: true
        }
      });
      return await customAxios
        .put(`/pet/${petId}/edit`, {
          aboutPet: `${about}`,
          birthday: `${birth}`,
          name: `${name}`,
          sex: `${sex}`,
          species: `${species}`
        })
        .then(() => {
          dispatch({
            type: "PET_LOADING",
            payload: {
              loading: false
            }
          });
          toast.success("수정이 완료 되었어요");
        });
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};

export const deleteMyPetInfo = (petId) => {
  return async () => {
    try {
      return await customAxios
        .delete(`/pet/${petId}/delete`)
        .then((res) => window.location.reload());
      // let delete_mypet = await deleteMyPetInfoAPI;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};
