var express = require('express')
var path = require('path')
var proxy = require('http-proxy-middleware');
var app = express()
app.use(express.static(path.join(__dirname + "/build")))

var doubanUrl = "https://api.douban.com"
// var url = "http://192.168.0.2:40001"
app.use('/douban/*', proxy({ target: doubanUrl, secure: false, changeOrigin: true, pathRewrite: { '^/douban': '' } }))

var zhihuUrl = "https://zhihu-daily.leanapp.cn"
// var url = "http://192.168.0.2:40001"
app.use('/zhihu/*', proxy({ target: zhihuUrl, secure: false, changeOrigin: true, pathRewrite: { '^/zhihu': '' } }))

app.listen(8888, function () {
    console.log("App listening at port 8888;")
})


// "proxy": {
//     "/douban": {
//       "target": "https://api.douban.com",
//       "secure": false,
//       "changeOrigin": true,
//       "pathRewrite": {
//         "^/douban": ""
//       }
//     },
//     "/zhihu": {
//       "target": "https://zhihu-daily.leanapp.cn",
//       "secure": false,
//       "changeOrigin": true,
//       "pathRewrite": {
//         "^/zhihu": ""
//       }
//     }
//   }