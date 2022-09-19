// 리듀서들을 묶어준다.
import { combineReducers } from "redux";
import loginReducers from "./loginReducer";
import mappingReducer from "./mappingReducer";
import petReducer from "./petReducer";


const rootReducer = combineReducers({
  login: loginReducers,
  mapping: mappingReducer,
  pet: petReducer
});

export default rootReducer;
