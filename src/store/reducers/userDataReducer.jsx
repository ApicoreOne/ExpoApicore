const initialState = {
	authorization : null,
	entity: {}
}

export const userDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_USER_DATA":
			return {
				...state,
				authorization : action.authorization
			};

		case "SET_USER_ENTITY":{
			return {
				...state,
				entity : action.entity
			};
		}
		default:
			return state;
	}
}