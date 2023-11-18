const stateDefault = {
    arrStatical:[]
}


export const ChartReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'GET_STATICAL': {
            state.arrStatical = action.arrStatical;
            return { ...state }
        }
      
        default: return state;
    }
}