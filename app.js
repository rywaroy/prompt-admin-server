const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const initRouter = require('./router');
const resultMiddleware = require('./middleware/result');

const app = express();

// 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(resultMiddleware);

// 路由
initRouter(app);

// 启动服务器
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
