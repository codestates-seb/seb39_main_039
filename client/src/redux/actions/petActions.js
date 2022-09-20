import customAxios from "../axiosAPI";

export const GET_PET_INFO_SUCCESS = "GET_PET_INFO_SUCCESS";

export const getMyPetInfo = () => {
  return async (dispatch) => {
    try {
      const getMyPetInfoAPI = customAxios.get(`/pet/detailList`);
      let get_myPetInfo = await getMyPetInfoAPI;
      dispatch({
        type: "GET_PET_INFO_SUCCESS",
        payload: {
          myPetInfo: get_myPetInfo.data
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
  return async () => {
    try {
      const editMyPetInfoAPI = await customAxios
        .put(`/pet/${petId}/edit`, {
          aboutPet: `${about}`,
          birthday: `${birth}`,
          name: `${name}`,
          sex: `${sex}`,
          species: `${species}`
        })
        .then((res) => window.location.reload());
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};

export const deleteMyPetInfo = (petId) => {
  return async () => {
    try {
      const deleteMyPetInfoAPI = await customAxios
        .delete(`/pet/${petId}/delete`)
        .then((res) => window.location.reload());
      // let delete_mypet = await deleteMyPetInfoAPI;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};
