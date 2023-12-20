import { http } from "../../utis/reponse";

export const GetListOrderAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/order/getlistorder');
            const action = {
                type: "GET_LIST_ORDER",
                arrOrder: result.data.data
            }
            console.log(result.data.data)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}


export const UpdateOrder = (value) => {
    return async (dispatch) => {
        try {
            let result = await http.post('/order/updateOrder', value);
            const action = GetListOrderAction()
            dispatch(action)
        } catch (error) {
            console.log(error);
        }
    }
}