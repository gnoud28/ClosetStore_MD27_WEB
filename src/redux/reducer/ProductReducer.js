const stateDefault = {
    arrProduct:[]
}


export const ProductReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'GET_LIST_PRODUCT': {
            state.arrProduct = action.arrProduct;
            return { ...state }
        }
      
        default: return state;
    }
}