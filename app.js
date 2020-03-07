const config = require('./package.json');
//引入express中间件
const express = require('express');
const app = express();

//指定启动服务器到哪个文件夹
app.use(express.static('./dist'));

if(!config || !config.server || !config.server.port) {
    console.log('Set server.port on package.json pls.');
}

else {
    //监听端口建议为
    const server = app.listen(config.server.port, function () {

        console.log('Web App listening at http://localhost:%s', config.server.port);
    });
}


