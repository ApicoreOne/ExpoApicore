const initialState = {
	authorization : null
}

export const userDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_USER_DATA":
			return {
				...state,
				authorization : action.authorization
			};
		default:
			return state;
	}
}