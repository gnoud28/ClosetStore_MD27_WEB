import { http } from "../../utis/reponse";


export const getAllCommetAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/comment/getAllComments');
            const action = {
                type: "GET_LIST_COMMENT",
                arrComment: result.data.data
            }
            console.log(result.data.data)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}

export const DeleteCommentAction = (comment_id) => {
    return async (dispatch) => {
        try {
            let result = await http.delete(`/comment/deleteComment/${comment_id}`);
            const action = getAllCommetAction()
            alert(`Xóa Comment ${comment_id} thành công`)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}

