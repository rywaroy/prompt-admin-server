const groupRouter = require('./group');

function initRouter(app) {
    app.use('/api', groupRouter);
}

module.exports = initRouter;
