const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
   
const router = express.Router();


router.post("/", isNotLoggedIn, async (req,res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12);
        const exUser = await db.User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if(exUser) {
            return res.status(403).json({
                errorCode: 1,
                message: "이미 회원가입되어있습니다"
            })
        }
        const newUser = await db.User.create({
            email: req.body.email,
            password: hash,
            nickname: req.body.nickname,
        });

        // HTTP STATUS CODE 201 : 성공적으로 생성됨. 
        // res.status(201).json(newUser); // body에 josn으로 응답. 문자열은 send();
        passport.authenticate("local", (err, user, info) => {
            if(err) {
                console.error(err);
                return next(err);
            }
            if(info) {
                return res.status(401).send(info.reason);
            }
    
            return req.login(user, async (err) => {
                if(err) {
                    console.error(err);
                    return next(err);
                }
                return res.json(user);
            });
      
        })(req,res,next);
    }catch(err) {
        console.error(err);
        return next(err);
    }
 
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
    // passport->local.js 로 보낸다. "local"부분이 보낼 위치
    passport.authenticate("local", (err, user, info) => {
        // local.js에서 리턴되어 왔다면 아래 실행.
        if(err) {
            // 에러는 서버에서 실패한 것.
            console.error(err);
            return next(err);
        }
        if(info) {
            // 실패는 프론트에서 잘못된 값. 아이디없거나 비번틀렸거나. 그래서 에러가 아니고 실패로 리턴
            return res.status(401).send(info.reason);
        }

        return req.login(user, async (err) => {
            if(err) {
                console.error(err);
                return next(err);
            }
            return res.json(user);
        });
        // req.login -> 미들웨어 패스포트.이니셜라이즈의 기능. 로그인, 로그아웃이 있다.
        // 세션에 사용자 정보를 넣어준다. 즉, 로그인 된 상태를 만들어준다.
        // 어떻게 세션정보를 만들어주냐? 패스포트->인덱스 serializeUser
        // 즉 req.login의 user는 패스포트->인덱스 serializeUser로 가서 처리 후 여기로 리턴되어 옴
        // 시리얼라이즈유저는 세션에 user.id가 저장되고 트루,펄스 리턴되게 되어 있음
        // 쿠키 역시 req.login이 알아서 프론트로 보내줌.(세션과 쿠키처리 다 완료.)
        // return res.json(user)로 프론트로 body정보를 내려다보냄.
        // 쿠키는 header기 때문에 req.login으로 처리, 사용자정보는 body기 때문에 return res.~~(user) 로 처리

    })(req,res,next);
});

router.post("/logout", isLoggedIn, (req, res) => {
    // 패스포트->인덱스의 디시리얼라이즈가 트루면 req.isAuthenticated()를 true로 만들어준다
    // 미들웨어는 req, res 간섭이 가능하기때문에 아래 가능
    if(req.isAuthenticated()) {
        req.logout();
        req.session.destroy(); // 선택사항
        return res.status(200).send("로그아웃 되었습니다.");
    }
});


module.exports = router;