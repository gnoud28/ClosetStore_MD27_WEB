const stateDefault = {
    arrOrder:[]
}


export const OrderReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'GET_LIST_ORDER': {
            state.arrOrder = action.arrOrder;
            return { ...state }
        }
      
        default: return state;
    }
}