const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
});

exports.createUser = async (req, res) => {
    const { account, password, secret, admin } = req.body;
    if (secret !== process.env.CREATE_USER_SECRET) {
        return res.error('Secret incorrect');
    }
    if (!account || !password) {
        return res.error('Account or password is empty');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
        account,
        password: hash,
        uuid: uuidv4(),
        admin,
    });
    res.success(user);
};

exports.login = async (req, res) => {
    const { account, password } = req.body;
    const user = await UserModel.findOne({
        where: {
            account,
        },
    });
    if (!user) {
        return res.error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.error('Password incorrect');
    }
    res.success({
        token: generateToken(user.uuid),
        account: user.account,
        admin: user.admin,
    });
};

exports.getUserInfo = async (req, res) => {
    res.success(req.user);
};
