import * as actionTypes from '../constants/zhihu'
/*
*   Themes
*/
// 设置数据
export function setThemes(payload) {
    return {
        type: actionTypes.ZHIHU_THEMES,
        payload,
    }
}
// 改变抽屉状态
export function toggleThemes(payload) {
    return {
        type: actionTypes.ZHIHU_TOGGLE_THEMES,
        payload,
    }
}
/*
*   Home
*/
export function setHomeData(payload) {
    return {
        type: actionTypes.ZHIHU_HOME,
        payload,
    }
}