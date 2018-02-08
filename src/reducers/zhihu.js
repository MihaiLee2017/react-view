import { combineReducers } from 'redux'
import * as actionTypes from '../constants/zhihu'

const themeState = {
    themes: [],
    currentThemes: {}
}

function themeStates(state = themeState, action) {
    switch (action.type) {
        case actionTypes.ZHIHU_THEMES:
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default combineReducers({
    themeStates,
})