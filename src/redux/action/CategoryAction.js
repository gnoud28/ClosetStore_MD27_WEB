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