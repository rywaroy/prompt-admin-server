const jwt = require('jsonwebtoken');
const { UserModel } = require('../model');

function auth(isAdmin = true) {
    return function (req, res, next) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.error('401', 'Unauthorized');
        }
        const token = authorization.replace('Bearer ', '');
        if (!token) {
            return res.error('401', 'Unauthorized');
        }
        try {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.error('401', 'Unauthorized');
                }
                const user = await UserModel.findOne({
                    where: {
                        uuid: decoded.id,
                    },
                });
                if (isAdmin && user.admin !== 1) {
                    return res.error('401', 'Unauthorized');
                }
                req.user = user;
                next();
            });
        } catch (err) {
            return res.error('401', 'Unauthorized');
        }
    };
}

module.exports = auth;
