const groupRouter = require('./group');
const promptRouter = require('./prompt');
const UserRouter = require('./user');
const ChatRouter = require('./chat');

function initRouter(app) {
    app.use('/api', groupRouter);
    app.use('/api', promptRouter);
    app.use('/api', UserRouter);
    app.use('/api', ChatRouter);
}

module.exports = initRouter;
