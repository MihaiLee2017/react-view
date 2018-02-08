import * as actionTypes from '../constants/zhihu'

export function setThemes(payload) {
    return {
        type: actionTypes.ZHIHU_THEMES,
        payload,
    }
}