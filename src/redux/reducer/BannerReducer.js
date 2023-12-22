const stateDefault = {
    arrBanner:[]
}

export const BannerReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'GET_LIST_BANNER': {
            state.arrBanner = action.arrBanner;
            return { ...state }
        }
      
        default: return state;
    }
}