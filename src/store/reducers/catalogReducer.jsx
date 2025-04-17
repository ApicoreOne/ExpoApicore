const initialState = {
	distributor: {
		catalogList: {}
	},
	productList: {
		productList: [],
		offset: 0,
		nextOffset: 0,
		currentCategoryId: null
	},
	source: {
		catalogList: {}
	},
	categoryList: {
		categoryList: null,
		currentCategoryId: null,
		currentCategoryName: null
	},
	catalogCode : null
};

export const catalogReducer = (state = initialState, action) => {
	switch (action.type) {
		case "REFRESH_CATALOG_LIST":
			return {
				...state,
				distributor: {
					...state.distributor,
					catalogList: action.catalogList
				}
			};
		case "GET_PRODUCT_LIST":
			return {
				...state,
				productList: {
					...state.productList,
					productList: action.productList,
					offset: action.offset,
					nextOffset: action.nextOffset,
					currentCategoryId: action.currentCategoryId
				}
			};
		case "GET_MORE_PRODUCT_LIST":
			return {
				...state,
				productList: {
					...state.productList,
					productList: [...state.productList.productList, ...action.productList],
					offset: action.offset,
					nextOffset: action.nextOffset
				}
			};
		case "REFRESH_SOURCE_CATALOG_LIST":
			return {
				...state,
				source: {
					...state.source,
					catalogList: action.catalogList
				}
			};
		case "SET_CATALOG_CATEGORY_LIST" : {
			return{
				...state,
				categoryList: {
					...state.categoryList,
					categoryList: action.categoryList
				}
			}
		}
		case "SET_CATALOG_CURRENT_CATEGORY_ID" : {
			return{
				...state,
				categoryList: {
					...state.categoryList,
					currentCategoryId: action.currentCategoryId
				}
			}
		}
		case "SET_CATALOG_CURRENT_CATEGORY_NAME" : {
			return{
				...state,
				categoryList: {
					...state.categoryList,
					currentCategoryName: action.currentCategoryName
				}
			}
		}
		case "SET_CATALOG_CODE" : {
			return {
				...state,
				catalogCode: action.catalogCode
			}
		}
		case "CLEAR_CATALOG" : {
			return {
				distributor: {
					catalogList: {}
				},
				productList: {
					productList: [],
					offset: 0,
					nextOffset: 0,
					currentCategoryId: null
				},
				source: {
					catalogList: {}
				},
				categoryList: {
					categoryList: null,
					currentCategoryId: null
				},
				catalogCode : null
			}
		}
		default:
			return state;
	}
};
