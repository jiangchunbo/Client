const http = require("http");
const querystring = require("querystring");
const url = require('url');

/* 构造一个代理服务器 */
http.createServer(function (clientRequest, serverResponse) {
    let parsedUrl = url.parse(clientRequest.url, true);
    let options = {
        hostname: '127.0.0.1',
        port: 80,
        path: parsedUrl.path,
        method: clientRequest.method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    let proxyRequest = getProxyRequest(options, serverResponse);

    clientRequest.on('data', function (chunk) {
        proxyRequest.write(chunk);
    }).on('end', function () {
        proxyRequest.end();
    });

}).listen(8888);


function getProxyRequest(options, serverResponse) {
    serverResponse.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE,X-URL-PATH,x-access-token'
    });
    return http.request(options, function (res) {
        res.on('data', function (chunk) {
            serverResponse.write(chunk);
        });
        res.on('end', function () {
            serverResponse.end();
        });
        console.log(res.statusCode);
    }).on('error', function (err) {
        console.log(err.message);
    });
}





