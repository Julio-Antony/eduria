const proxy = require('http-proxy-middleware')

module.exports = function(app){
    app.use(proxy('/api',{target:"http://127.0.0.1:2400"}))
    app.use(proxy('/file',{target:"https://drive.google.com"}))
}