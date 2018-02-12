import { combineReducers } from 'redux'
import * as actionTypes from '../constants/zhihu'

/*
* theme list
*/
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
/*
* theme item
*/
const themeItem = {
    id: 0,
    top: {},
    stories: [],
    scrollDistance: 0,
}
function itemStates(state = themeItem, action) {
    switch (action.type) {
        case actionTypes.ZHIHU_THEME_ITEM:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
/*
* home item
*/
const homeState = {
    stories: [],
    top_stories: [],
    requestDate: '',
    hasMore: true,
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
/*
* detail item
*/
const detailState = {
    id: "",
    body: "",
    top: {},
    scrollDistance: 0,
}
function detailStates(state = detailState, action) {
    switch (action.type) {
        case actionTypes.ZHIHU_DETAIL:
            return { ...state, ...action.payload }
        // ZHIHU_HOME
        default:
            return state
    }
}
/*
* comment
*/
const commentState = {
    longComment: [],
    shortComment: []
}
function commentStates(state = commentState, action) {
    switch (action.type) {
        case actionTypes.ZHIHU_COMMENT:
            return { ...state, ...action.payload }
        // ZHIHU_HOME
        default:
            return state
    }
}

export default combineReducers({
    themeStates,
    itemStates,
    homeStates,
    detailStates,
    commentStates,
})