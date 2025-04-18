const initialState = {
	popupType : null,
	popupIsOpen : false,
	currentCatalogItem : null,
	currentPriceTypeItem : null,
	popupLarge : false,
	currentItem : null,
}

export const popupReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SWITCH_POPUP" :
			return {
				...state,
				popupType: action.popupType,
				popupIsOpen: action.popupIsOpen,
				currentCatalogItem: action.currentCatalogItem,
				currentPriceTypeItem: action.currentPriceTypeItem,
				popupLarge: action.popupLarge,
				currentItem: action.currentItem
			}
		default:
			return state;
	}
}