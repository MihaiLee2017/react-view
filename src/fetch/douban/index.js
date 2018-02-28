import { getDouBan } from '../request'
import * as URL from './url'

function setReplaceUrl(url, rep) {
    return url.replace(/\{([^)]*)\}/, rep)
}
// 正在上映
export function getDouBanInTheaters() {
    let url = URL.BASE_URL + URL.IN_THEATERS
    return getDouBan(url)
}
// 即将上映
export function getDouBanComingSoon(start, count) {
    let url = URL.BASE_URL + URL.COMING_SOON
    url = `${url}?start=${start}&count=${count}`
    return getDouBan(url)
}
// 详细信息
export function getDouBanSubject(id) {
    let url = URL.BASE_URL + URL.SUBJECT + id
    return getDouBan(url)
}
// 海报信息
export function getDouBanPhotos(id) {
    let url = URL.BASE_URL + URL.SUBJECT_PHOTOS
    url = setReplaceUrl(url, id)
    return getDouBan(url)
}

// 影人
export function getDouBanCelebrity(id) {
    let url = URL.BASE_URL + URL.CELEBRITY
    url = setReplaceUrl(url, id)
    return getDouBan(url)
}

// 电影
export function getDouBanSearch(test, start, count) {
    let url = URL.BASE_URL + URL.SEARCH
    url = setReplaceUrl(url, test)
    url = `${url}&start=${start}&count=${count}`
    return getDouBan(url)
}