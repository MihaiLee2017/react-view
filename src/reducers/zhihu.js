import { combineReducers } from 'redux'
import * as actionTypes from '../constants/zhihu'

const themeState = {
    themes: [],
    currentThemes: {},
    isShowThemes: false,
}

function themeStates(state = themeState, action) {
    switch (action.type) {
        case actionTypes.ZHIHU_THEMES:
            return { ...state, ...action.payload }
        case actionTypes.ZHIHU_TOGGLE_THEMES:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
const homeState = {
    stories: [],
    top_stories: [],
    scrollDistance: 0,
}
function homeStates(state = homeState, action) {
    switch (action.type) {
        case actionTypes.ZHIHU_HOME:
            return { ...state, ...action.payload }
        // ZHIHU_HOME
        default:
            return state
    }
}

export default combineReducers({
    themeStates,
    homeStates,
})