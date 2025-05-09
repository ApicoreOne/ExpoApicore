const initialState = {
	exponentList: [],
	exponentMeeting:{
		exponentMeetingDateList: [],
		exponentMeetingSlotList : [],
		currentExponentMeetingDate: null
	},
	currentExponentCode: null,
	exponentData: null
}

export const exponentReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case 'SET_EXPONENT_LIST': {
			return {
				...state,
				exponentList: action.exponentList
			}
		}

		case 'SET_EXPONENT_MEETING_DATE_LIST': {
			return {
				...state,
				exponentMeeting: {
					...state.exponentMeeting,
					exponentMeetingDateList: action.exponentMeetingDateList
				}
			}
		}

		case 'SET_EXPONENT_MEETING_SLOT': {
			return {
				...state,
				exponentMeeting: {
					...state.exponentMeeting,
					exponentMeetingSlotList: action.exponentMeetingSlotList
				}
			}
		}

		case 'SET_CURRENT_EXPONENT_MEETING_DATE': {
			return {
				...state,
				exponentMeeting: {
					...state.exponentMeeting,
					currentExponentMeetingDate: action.currentExponentMeetingDate
				}
			}
		}

		case 'CLEAR_EXPONENT_MEETING': {
			return {
				...state,
				exponentMeeting: {
					exponentMeetingDateList: [],
					exponentMeetingSlotList : [],
					currentExponentMeetingDate: null
				}
			}
		}

		case 'SET_CURRENT_EXPONENT_CODE': {
			return {
				...state,
				currentExponentCode: action.currentExponentCode
			}
		}

		case 'SET_EXPONENT_DATA': {
			return {
				...state,
				exponentData: action.exponentData
			}
		}

		default:
			return state;
	}
}
