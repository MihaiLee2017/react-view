import 'whatwg-fetch'

export function get(url) {
    let myHeaders = new Headers({
    });
    var result = fetch(url, {
        method: 'GET',
        headers: myHeaders,
    })
    return result
}
export function getDouBan(url) {
    let myHeaders = new Headers({
        // 'Referrer Policy': 'no-referrer-when-downgrade',
        // 'Access-Control-Allow-Origin': 'no-cors',
        // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        // 'Cache-Control': 'max-age=0',
        // 'Cookie': 'bid=D56mtWnWQ2A; ll="118281"; _vwo_uuid_v2=D170B73BB72BBFB72631396ADC568A5ED|57ada1814b75dd5b4cc8d585ccc663ec; __utmc=30149280; gr_user_id=48ec40ed-8a8a-4347-aafc-2d6830a48c23; __utma=30149280.1861953233.1518706274.1519441636.1519444111.4; __utmz=30149280.1519444111.4.3.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; _pk_id.100001.7f16=1ab1967882ca743c.1519441635.2.1519444259.1519441655.'
    });
    var result = fetch(url, {
        method: 'GET',
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        // },
        // mode: 'no-cors',
    })
    return result
}