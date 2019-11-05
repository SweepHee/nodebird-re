exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next(); // 다음 미들웨어로 넘어가라 (인수) 존재한다면 에러처리함
    }
    return res.status(401).send("로그인이 필요합니다.");
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send("로그인한 사람은 이용할 수 없습니다.");
}