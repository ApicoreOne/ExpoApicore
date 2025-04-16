import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {texpoReducer} from "./reducers/texpoReducer.jsx";


const rootReducer = combineReducers({
	texpo: texpoReducer
});

export const store = createStore(rootReducer, composeWithDevTools());
