import { combineReducers } from 'redux'
import zhihu from './zhihu'
import douban from './douban'

export default combineReducers({
    zhihu,
    douban,
})