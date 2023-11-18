import { http } from "../../utis/reponse";

export const GetStatisticalAction = () => {
    return async (dispatch) => {

        try {
            const months = [
                { name: 'Tháng 1', year: 2023, month: 1 },
                { name: 'Tháng 2', year: 2023, month: 2 },
                { name: 'Tháng 3', year: 2023, month: 3 },
                { name: 'Tháng 4', year: 2023, month: 4 },
                { name: 'Tháng 5', year: 2023, month: 5 },
                { name: 'Tháng 6', year: 2023, month: 6 },
                { name: 'Tháng 7', year: 2023, month: 7 },
                { name: 'Tháng 8', year: 2023, month: 8 },
                { name: 'Tháng 9', year: 2023, month: 9 },
                { name: 'Tháng 10', year: 2023, month: 10 },
                { name: 'Tháng 11', year: 2023, month: 11 },
                { name: 'Tháng 12', year: 2023, month: 12 }
            ];
            

            const allMonthsData = [];

            for (const month of months) {
                let result = await http.post(`/chart/getchart/${month.year}/${month.month}`);
                const monthData = result.data.data;
                allMonthsData.push(monthData);
            }
            dispatch({
                type: "GET_STATICAL",
                arrStatical: allMonthsData,
            });
            localStorage.setItem('statistical', JSON.stringify(allMonthsData))
        } catch (error) {
            console.log(error);
        }
    }
}