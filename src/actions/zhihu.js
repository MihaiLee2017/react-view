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
// themes item
export function setThemeItem(payload) {
    return {
        type: actionTypes.ZHIHU_THEME_ITEM,
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

/*
* Detail 
*/
export function setDetail(payload) {
    return {
        type: actionTypes.ZHIHU_DETAIL,
        payload,
    }
}

/*
* Comment 
*/
export function setComment(payload) {
    return {
        type: actionTypes.ZHIHU_COMMENT,
        payload,
    }
}