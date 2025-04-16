const initialState = {
	exponentList: [],
}

export const exponentReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case 'SET_EXPONENT_LIST': {
			return {
				...state,
				exponentList: action.exponentList
			}
		}
		default:
			return state;
	}
}
