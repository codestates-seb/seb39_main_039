// 리듀서들을 묶어준다.
import { combineReducers } from "redux";
import loginReducers from "./loginReducer";
import signupReducers from "./signupReducer";
import mappingReducer from "./mappingReducer";
import petReducer from "./petReducer";
import petwalkReducer from "./petwalkReducer";

import userReducer from "./userReducer";
import wantedReducer from "./wantedReducer";

const rootReducer = combineReducers({
  login: loginReducers,
  signup: signupReducers,
  mapping: mappingReducer,
  pet: petReducer,
  petwalk: petwalkReducer,
  user: userReducer,
  wanted: wantedReducer
});

export default rootReducer;
