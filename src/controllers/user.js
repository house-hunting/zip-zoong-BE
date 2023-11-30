const User = require('../models/user');


exports.connect = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.user.id } });
        if(user) {
            await user.addConnecting(parseInt(req.params.id, 10));
            res.send('success');
        } else {
            res.status(404).send('유저가 없습니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.disconnect = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: {id: req.user.id } });
        if(user) {
            await user.removeConnecting(parseInt(req.params.id, 10));
            res.send('success');
        } else {
            res.status(404).send('유저가 없습니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.profile = async (seq, res, next) => {
    try {
        const nick = await User.findOne({ where: {nick: req.user.nick}});
        if (!nick) {
            await User.update({nick: req.body.nick}, {
                where: {id: req.user.id},
            });
            res.send('사용가능한 닉네임 입니다.')
        } else {
            res.status(404).send('다른 사용자가 닉네임을 사용중 입니다.');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};