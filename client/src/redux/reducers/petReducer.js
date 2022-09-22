import { GET_PET_INFO_SUCCESS, PET_LOADING } from "../actions/petActions";

const initialstate = {
  myPetInfo: [],
  loading: ""
};

const petReducer = (state = initialstate, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_PET_INFO_SUCCESS:
      return {
        ...state,
        myPetInfo: payload.myPetInfo
      };
    case PET_LOADING:
      return {
        ...state,
        loading: payload.loading
      };
    default:
      return state;
  }
};

export default petReducer;
