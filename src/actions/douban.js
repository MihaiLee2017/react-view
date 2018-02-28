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

// 电影详情
export function fileDetail(payload) {
    return {
        type: actionTypes.DOUBAN_FILE_DETAIL,
        payload,
    }
}

// 电影人
export function celebrityDetail(payload) {
    return {
        type: actionTypes.DOUBAN_FILE_CELEBRITY,
        payload,
    }
}

// 搜索记录
export function searchCookie(payload) {
    return {
        type: actionTypes.DOUBAN_SEARCH_COOKIE,
        payload,
    }
}
export function searchList(payload) {
    return {
        type: actionTypes.DOUBAN_SEARCH_LIST,
        payload,
    }
}