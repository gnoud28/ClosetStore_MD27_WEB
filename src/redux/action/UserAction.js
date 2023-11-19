import { http } from "../../utis/reponse";

export const GetListUserAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/user/getalluser');
            const action = {
                type: "GET_LIST_USER",
                arrUser: result.data.data
            }
            console.log(result.data.data)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}


export const DeleteUserAction = (id) => {
    return async (dispatch) => {
        try {
            let result = await http.delete(`/user/deleteuser/${id}`);
            const action = GetListUserAction()
            dispatch(action)
            console.log(result)
        } catch (error) {
            console.log(error);
        }
    }
}