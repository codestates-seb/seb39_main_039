// 리듀서들을 묶어준다.
import { combineReducers } from 'redux';
import loginReducers from './loginReducer';
import conReducers from './conReducer';

const rootReducer = combineReducers({
    loginReducers,
    conReducers,
})

export default rootReducer