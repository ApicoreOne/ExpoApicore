import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {exponentReducer} from "./reducers/exponentReducer.jsx";


const rootReducer = combineReducers({
	exponent: exponentReducer()
});

export const store = createStore(rootReducer, composeWithDevTools());
