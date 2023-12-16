
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
            let result = await http.post('/categoty/updatecategory', value);
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
            let result = await http.post('/categoty/createcategory', value);
            const action = GetListCategotyAction()
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}
export const DeleteCategoryAction = (category_id, category_name) => {
    return async (dispatch) => {
        try {
            let result = await http.delete(`/categoty/deleteCate/${category_id}`);
            const action = GetListCategotyAction()
            dispatch(action)
            // toast.current.show({
            //     severity: "success",
            //     summary: "Thành công",
            //     detail: `Xóa loại sản phẩm ${category_name} thành công`,
            //     life: 3000,
            //     options: {
            //       style: {
            //         zIndex: 100,
            //       },
            //     },
            //   });

            alert(`Xóa loại sản phẩm ${category_name} thành công`)
        } catch (error) {
            console.log(error.response.data.message);
            alert(error.response.data.message)
        }
    }
}
