import { SAVE_PET_INFO_SUCCESS } from "../actions/petActions";

const initialstate = {
  petName: "",
  petBirth: "",
  petInfo: "",
  petPicture: "",
  petSpec: "",
  petSex: ""
};

const petReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case SAVE_PET_INFO_SUCCESS:
      return {
        ...state,
        petName: payload.name,
        petBirth: payload.birthday,
        petInfo: payload.aboutPet,
        petPicture: payload.picture,
        petSpec: payload.species,
        petSex: payload.sex
      };

    default:
      return { ...state };
  }
};

export default petReducer;
