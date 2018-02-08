import { get } from '../request'
import * as URL from './url'

function setReplaceUrl(url, rep) {
    return url.replace(/\{([^)]*)\}/, rep)
}

//获取知乎日报
export function getZhiHuLastDaily(date) {
    let url = date ? URL.BEFORE_STORIES : URL.LAST_STORIES
    if (date) {
        url = setReplaceUrl(url, date)
    }
    return get(url)
}
//获取详细内容
export function getZhiHuDetail(id) {
    let url = URL.ARTICLE_CONTENTS
    url = setReplaceUrl(url, id)
    return get(url)
}

// 长评论
export function getLongCommont(id) {
    let url = URL.ARTICLE_LONG_COMMENTS
    url = setReplaceUrl(url, id)
    return get(url)
}

// 短评论
export function getShortCommont(id) {
    let url = URL.ARTICLE_SHORT_COMMENTS
    url = setReplaceUrl(url, id)
    return get(url)
}

// DAILY_THEMES
export function getDailyThemes() {
    let url = URL.DAILY_THEMES
    return get(url)
}
//DAILY_THEMES_ITEM
export function getDailyThemesItem(id) {
    let url = URL.DAILY_THEMES_ITEM
    url = setReplaceUrl(url, id)
    return get(url)
}