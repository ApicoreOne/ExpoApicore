const initialState = {
	headerMonths : null,
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_HEADER_MONTHS" :
			return {
				...state,
				headerMonths: action.headerMonths,
			}
		default:
			return state;
	}
}