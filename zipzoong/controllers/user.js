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