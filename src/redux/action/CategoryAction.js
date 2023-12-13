import { http } from "../../utis/reponse";

export const GetListCategotyAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/categoty/getlistcategory');
            const action = {
                type: "GET_LIST_CATEGORY",
                arrCategory: result.data.data
            }
            console.log(result.data.data)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }   
    }
}


export const UpdateCategotyAction = (value) => {
    return async (dispatch) => {
        try {
            let result = await http.post('/categoty/updatecategory',value);
            const action = GetListCategotyAction()
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}
export const CreateCategotyAction = (value) => {
    return async (dispatch) => {
        try {
            let result = await http.post('/categoty/createcategory',value);
            const action = GetListCategotyAction()
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}
export const DeleteCategoryAction = (category_id) => {
    return async (dispatch) => {
        try {
            let result = await http.delete(`/categoty/deletecategory/${category_id}`);
            const action = GetListCategotyAction();
            dispatch(action);
        } catch (error) {
            console.log(error);
        }
    }
}
