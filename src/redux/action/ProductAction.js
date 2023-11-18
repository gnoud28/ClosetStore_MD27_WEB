import { http } from "../../utis/reponse";

export const GetListProductAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/products/getallproducts');
            const action = {
                type: "GET_LIST_PRODUCT",
                arrProduct: result.data.data
            }
            console.log(result.data.data)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}

export const CreateProductAction = (value) => {
    return async (dispatch) => {
        try {
            let result = await http.post('/products/createproduct', value);
            const action = GetListProductAction()
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}
export const UpdateProductAction = (value) => {
    return async (dispatch) => {
        try {
            let result = await http.post('/products/updateproduct', value);
            const action = GetListProductAction()
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}
export const DeleteProductAction = (id) => {
    return async (dispatch) => {
        try {
            let result = await http.delete(`/products/deleteproduct/${id}` );
            const action = GetListProductAction()
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}