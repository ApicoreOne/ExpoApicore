import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {exponentReducer} from "./reducers/exponentReducer.jsx";
import {modalReducer} from "@/store/reducers/modalReducer.jsx";
import {catalogReducer} from "@/store/reducers/catalogReducer.jsx";
import {favoriteReducer} from "@/store/reducers/favoriteReducer.jsx";
import {userDataReducer} from "@/store/reducers/userDataReducer.jsx";
import {popupReducer} from "@/store/reducers/popupReducer.jsx";


const rootReducer = combineReducers({
	exponent: exponentReducer,
	multiModal: modalReducer,
	catalog: catalogReducer,
	favorite: favoriteReducer,
	userData: userDataReducer,
	multiPopup: popupReducer
});

export const store = createStore(rootReducer, composeWithDevTools());
