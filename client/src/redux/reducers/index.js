// 리듀서들을 묶어준다.
import { combineReducers } from "redux";
import loginReducers from "./loginReducer";
import signupReducers from "./signupReducer";
import mappingReducer from "./mappingReducer";
import petReducer from "./petReducer";
import petwalkReducer from "./petwalkReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userReducer";
import wantedReducer from "./wantedReducer";
import cityReducer from "./cityReducer";

const persistConfig = {
  key: "root",
  storage,
  blackList: ["pet"]
};

const rootReducer = combineReducers({
  login: loginReducers,
  signup: signupReducers,
  mapping: mappingReducer,
  pet: petReducer,
  petwalk: petwalkReducer,
  user: userReducer,
  wanted: wantedReducer,
  city: cityReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
