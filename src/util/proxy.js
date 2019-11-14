const Querystring = require('querystring')

const Url = require('url');
const Http = require('http');

//导入querystring模块（解析post请求数据）
// const querystring = require('querystring');

/* 服务器 hostname */
const hostname = '127.0.0.1';
/* 服务器 port */
const port = 9999;


/* Url.parse 之后有属性形如 path = '/user', pathname = '/user?id=1' */
Http.createServer((request, response) => {
    let responseBody = [];
    /* 请求体 */
    let requestBody = [];
    let parsedUrl = Url.parse(request.url, true);
    let options = {
        hostname: hostname,
        port: port,
        path: parsedUrl.path,
        method: request.method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': requestBody.length
        }
    };



    let request0 = Http.request(options, (_response) => {
        _response.on('data', (chunk) => {
            responseBody.push(chunk);
        }).on('end', () => {
            response.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,X-URL-PATH,x-access-token"
            });
            console.log('接收到' + responseBody);
            responseBody = Buffer.concat(responseBody);
            response.end(responseBody);
        });
    }).on('end', function () {
        console.log('end', responseBody);
    }).on('error', function (e) {
        console.log("error: " + e.message);
    });




    /* 当有 chunk 时, 追加 chunk;  */
    request.on('data', function (chunk) {
        requestBody.push(chunk);

    }).on('end', function () {
        requestBody = Buffer.concat(requestBody);
        request0.write(requestBody);
        request0.end();

    });


}).listen(8888, hostname);

console.log('监听 127.0.0.1:8888 服务已启动');


// /**
//  * 该脚本一旦确定完毕后期就不必再修改
//  */
//
// /* 导入 http 模块 */
// const Http = require('http');
// /* 导入 url 模块 */
// const Url = require('url');
// const Request = require('request');
//
// /* 本地代理主机名, 一般就是与本地 IP 一致 */
// const hostname = '192.168.0.103';
// /* 本地代理端口, 与前端服务器有所区别 */
// const port = 8888;
//
// /* 创建一个服务器, 接收用户的请求 */
// const apiServer = Http.createServer(function(request, response) {
//
//     /* request.url, 比如 '/' */
//     const url = 'http://192.168.0.103:3000' + request.url;
//     console.log('body');
//     /* 发送请求给真正的服务器 */
//     let body = '';
//     let options = {
//         hostname: '192.168.0.103',
//         method: 'POST',
//         path: 'user',
//         port: 3000,
//         headers: {
//             "Content-Type": 'application/json',
//             'Content-Length':
//         }
//     };
//     http.request(options, function (bres) {
//         bres.on('data', function (data) {
//             body += data;
//             console.log(data);
//         }).on('end', function () {
//             response.writeHead(200, {
//                 'Access-Control-Allow-Origin': '*',
//                 "Access-Control-Allow-Methods": "*",
//                 "Access-Control-Allow-Headers": "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,X-URL-PATH,x-access-token"
//             });
//             console.log(body);
//             response.end(body);
//         });
//     }).on('error', function (e) {
//         console.log("error: " + e.message);
//     })
// });
//
// apiServer.listen(port, hostname, () => {
//     console.log(`接口代理运行在http:${hostname}:${port}/`);
// });
