const initialState = {
	modals: [
		{
			modalType: null,
			modalIsOpen: false,
			modalData: null,
			modalWidth: null,
			currentCategoryId: null,
			modalLevel: 1,
			isAuth: null,
		},
		{
			modalType: null,
			modalIsOpen: false,
			modalData: null,
			modalWidth: null,
			currentCategoryId: null,
			modalLevel: 2,
			isAuth: null,
		},
		{
			modalType: null,
			modalIsOpen: false,
			modalData: null,
			modalWidth: null,
			currentCategoryId: null,
			modalLevel: 3,
			isAuth: null,
		},
	],
}

export const modalReducer = (state = initialState, action) => {
	switch (action.type) {
		case "OPEN_MODAL":
			return {
				...state,
				modals: state.modals.map((modal) => {
					if (modal.modalLevel === action.modalLevel) {
						return {
							...modal,
							modalType: action.modalType,
							modalIsOpen: true,
							modalData: action.modalData,
							modalWidth: action.modalWidth,
							isAuth: action.isAuth
						}
					}
					return modal;
				})
			};
		case "SET_MODAL_DATA": {
			return {
				...state,
				modals: state.modals.map((modal) => {
					if (modal.modalLevel === action.modalLevel) {
						return {
							...modal,
							modalData: action.modalData
						}
					}
					return modal;
				})
			}
		}
		case "CLOSE_MODAL": {
			return{
				...state,
				modals: state.modals.map((modal) => {
					if (modal.modalLevel === action.modalLevel) {
						return {
							...modal,
							modalType: null,
							modalIsOpen: false
						}
					}
					return modal;
				})
			}
		}
		case "CHANGE_MODAL_IS_AUTH":{
			return{
				...state,
				modals: state.modals.map((modal) => {
					if (modal.modalLevel === action.modalLevel) {
						return {
							...modal,
							isAuth: action.isAuth
						}
					}
					return modal;
				})
			}
		}
		case "CLEAR_MODAL": {
			return {
				...state,
				modals: state.modals.map((modal) => {
					if (modal.modalLevel === action.modalLevel) {
						return {
							...modal,
							modalType: null,
							modalIsOpen: false,
							modalData: null,
							modalWidth: null,
						}
					}
					return modal;
				})
			}
		}
		default:
			return state;
	}
}