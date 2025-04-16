const initialState = {
	texpo: 'Hello World',
}

export const texpoReducer = (state = initialState, action) => {
	switch (action.type) {

		case 'GET_TEXPO': {
			return {
				...state,
				texpo: action.payload
			}
		}

		default:
			return state;
	}
}