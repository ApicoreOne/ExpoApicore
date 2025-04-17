const initialState = {
	favoriteList: []
}

export const favoriteReducer = (state = initialState, action) => {

	switch (action.type) {
		case "SET_FAVORITE_LIST":
			return {
				...state,
				favoriteList: action.favoriteList
			}
		default:
			return state;
	}
}