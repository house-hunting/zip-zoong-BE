exports.isLoggedIn = (req , res, next) => {
    if (req.isAuthenticated()) {    // isAuthenticated() 사용자 인증 메서드
        next();
    } else {
        res.status(403).send('로그인을 해주세요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redurect('/?error=${message}');
    }
};