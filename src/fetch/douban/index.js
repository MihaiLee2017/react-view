import { getDouBan } from '../request'
import * as URL from './url'

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
