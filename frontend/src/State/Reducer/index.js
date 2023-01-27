import { combineReducers } from "redux";
import Reducer from './reducer';
import Data from './dataReducer';


const reducers = combineReducers({
    token:Reducer,
    data:Data
    
});

export default reducers;
