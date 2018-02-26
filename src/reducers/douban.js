import { combineReducers } from 'redux'
import * as actionTypes from '../constants/douban'

const theatersState = {
    list: [],
    scrollDistance: 0,
}
function theatersStates(state = theatersState, action) {
    switch (action.type) {
        case actionTypes.DOUBAN_THEATERS:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
const comingState = {
    list: [],
    page: {
        total: 0,
        start: 0,
        count: 20,
        hasMore: true,
    },
    scrollDistance: 0,
}
function comingStates(state = comingState, action) {
    switch (action.type) {
        case actionTypes.DOUBAN_COMING:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
const tabState = {
    tab_key: "",
}
function tabKeyStates(state = tabState, action) {
    switch (action.type) {
        case actionTypes.DOUBAN_SET_KEY:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
const fileDetailState = {
    title: '',
    images: [],
    year: '',
    rating: {},
    genres: [],
    countries: [],
    ratings_count: '',
    summary: '',
    directors: [],
    casts: [],
}
function fileDetailStates(state = fileDetailState, action) {
    switch (action.type) {
        case actionTypes.DOUBAN_FILE_DETAIL:
            return { ...state, ...action.payload }
        default:
            return state
    }
}
export default combineReducers({
    theatersStates,
    comingStates,
    tabKeyStates,
    fileDetailStates,
})