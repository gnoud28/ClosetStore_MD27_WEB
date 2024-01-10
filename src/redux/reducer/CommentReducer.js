const stateDefault = {
    arrComment:[]
}


export const CommentReducer = (state = stateDefault, action) => {
    switch (action.type) {

        case 'GET_LIST_COMMENT': {
            state.arrComment = action.arrComment;
            return { ...state }
        }
      
        default: return state;
    }
}