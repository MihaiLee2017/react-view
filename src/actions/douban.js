import * as actionTypes from '../constants/douban'

/*
*   正在热播 
*/
// 正在热播
export function setInTheaters(payload) {
    return {
        type: actionTypes.DOUBAN_THEATERS,
        payload,
    }
}
// 正在热播
export function setComing(payload) {
    return {
        type: actionTypes.DOUBAN_COMING,
        payload,
    }
}

// 当前显示的tab
export function toggleTabKey(payload) {
    return {
        type: actionTypes.DOUBAN_SET_KEY,
        payload,
    }
}