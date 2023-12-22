const stateDefault = {
    arrBanner: []
}

export const BannerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_LIST_BANNER': {
            return {
                ...state,
                arrBanner: action.arrBanner // Cập nhật arrBanner trong bản sao mới của state
            };
        }
        default:
            return state;
    }
}
