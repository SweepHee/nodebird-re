const passport = require("passport");
const local = require("./local");
const db = require("../models");

module.exports = () => {
    passport.serializeUser((user, done) => {
        // id값을 해시해서 리턴(세션, 쿠키)
        return done(null, user.id);
    });
    passport.deserializeUser( async (id, done) => {
        // 해시된 쿠키값 해제
        // 로그인 후에 모든 요청에 이것이 불러짐.
        try {
            const user = await db.User.findOne({ where: { id }  })
            return done(null, user); // req.user, req.isAuthenticated() === true 로 만들어줌.
        }catch (err) {
            console.error(err);
            return done(err);
        }
 
    });
    local();

};