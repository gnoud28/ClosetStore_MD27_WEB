import { http } from "../../utis/reponse";

export const GetListBannerAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/banner/getlistbanner');
            const action = {
                type: "GET_LIST_BANNER",
                arrBanner: result.data.data
            }
            console.log(result.data.data)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}

export const CreateBannerAction = (value) => {
    return async (dispatch) => {
        try {
            let result = await http.post('/banner/createBanner', value);
            const action = GetListBannerAction()
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}
export const UpdateBannerAction = (value) => {
    return async (dispatch) => {
        try {
            let result = await http.post('/banner/updateBanner', value);
            const action = GetListBannerAction()
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}
export const DeleteBannerAction = (banner_id, title) => {
    return async (dispatch) => {
        try {
            let result = await http.delete(`/banner/deleteBanner/${banner_id}`);
            const action = GetListBannerAction()
            alert(`Xóa banner ${title} thành công`)
            dispatch(action)

        } catch (error) {
            console.log(error);
        }
    }
}
