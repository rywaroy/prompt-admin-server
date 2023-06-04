const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const initRouter = require('./router');
const resultMiddleware = require('./middleware/result');

const app = express();

// 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    // 支持 Content-Type text/event-stream
    exposedHeaders: ['Content-Type', 'Content-Length'],
}));
app.use(resultMiddleware);

// 路由
initRouter(app);

// 启动服务器
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
