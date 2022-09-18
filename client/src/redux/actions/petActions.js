import axiosAPI from "../axiosAPI";

export const SAVE_PET_INFO_SUCCESS = "SAVE_PET_INFO_SUCCESS";

export const myPetInfo = (name, species, birth, sex, about) => ({
  type: SAVE_PET_INFO_SUCCESS,
  payload: {
    aboutPet: `${about}`,
    birthday: `${birth}`,
    name: `${name}`,
    picture: "string",
    sex: `${sex}`,
    species: `${species}`
  }
});

export const addMyPet = (name, species, birth, sex, about) => {
  return async () => {
    try {
      const addMyPetAPI = axiosAPI.post(`/pet/create`, {
        aboutPet: `${about}`,
        birthday: `${birth}`,
        name: `${name}`,
        picture:
          "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99D740415C432CC526",
        sex: `${sex}`,
        species: `${species}`
      });
      let add_myPet = await addMyPetAPI;
    } catch (error) {
      //에러 핸들링 하는 곳
      console.log("에러", error);
    }
  };
};
