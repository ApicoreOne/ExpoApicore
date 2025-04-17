import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {exponentReducer} from "./reducers/exponentReducer.jsx";
import {modalReducer} from "@/store/reducers/modalReducer.jsx";


const rootReducer = combineReducers({
	exponent: exponentReducer,
	multiModal: modalReducer
});

export const store = createStore(rootReducer, composeWithDevTools());
