import { GET_PET_INFO_SUCCESS } from "../actions/petActions";

const initialstate = {
  myPetInfo: []
};

const petReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_PET_INFO_SUCCESS:
      return {
        ...state,
        myPetInfo: payload.myPetInfo
      };

    default:
      return state ;
  }
};

export default petReducer;
