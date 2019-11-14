const Querystring = require('querystring');

const Url = require('url');
const Http = require('http');


var server=Http.createServer(function(req ,res){
    console.log("有人来了");
    res.write("asdfgh");//写入asdfg
    res.end();

});
server.listen(9999);//设置端口