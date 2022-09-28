import customAxios from "../axiosAPI";

export const GET_WALKER_INFO_SUCCESS = "GET_WALKER_INFO_SUCCESS";
export const WALKER_LOADING = "WALKER_LOADING";

export async function getWalkerDetailInfo(setWalkerDetailInfo) {
    try {
        let getWalkerInfo = await customAxios.get(`/walker`);
        setWalkerDetailInfo(getWalkerInfo.data)
        return getWalkerInfo.data;
    } catch (error) {
        //에러 핸들링 하는 곳
        console.log(error);
    }
}

export async function getWalkerWalkHistory(setWalkHistory, page) {
    try {
        let getWalkerWalkHistory = await customAxios.get(`/walk/walkHistory?page=${page}`);
        setWalkHistory(getWalkerWalkHistory.data);
        console.log(getWalkerWalkHistory)
        return getWalkerWalkHistory.data;
    } catch (error) {
        console.log(error);
    }
}