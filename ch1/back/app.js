const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const passport = require("passport");
// 내가만든 passport파일이랑 모듈이랑 햇깔리지 않게 config붙인것. 필수아님.
const session = require("express-session");
const cookie = require("cookie-parser");
const morgan = require("morgan");
const db = require("./models");
const passportConfig = require("./passport");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const app = express();





db.sequelize.sync({ force: true }); // db 실행
// db 테이블 값 변경되었을 때 새로 설정하는 것. force: true
// 단, 이 경우 안에 있는 데이터 다 삭제됨. 개발 단계에서만 사용할 것
// 설정한번 변경하면 true로 키고 다시 지우거나 false 처리할 것!!!!
// 배포단계에선 마이그레이션 찾아서 익혀야 함.
// 다른방법으론 워크벤치가서 테이블열어서 설정 바꿔주면 된다고 함.
passportConfig();

/* ---------- middleware ---------- */
app.use(morgan("dev"))
app.use(cors({ // 프론트서버와 주소가 다른 경우 cors 에러날 때 프론트서버 주소를 지정해줘야한다.
    origin: "http://localhost:3000",
    credentials: true, // 이걸 해줘야 서로간에 cookie를 주고 받을 수 있다.
}));
app.use("/", express.static("uploads"));
app.use(express.json()); // express는 json 요청을 못받아서 선언해줘야 한다! 파싱
app.use(express.urlencoded({ extended: false })); // form 데이터를 받아준다
app.use(cookie("cookiesecret"));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret",
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
    res.send("안녕 Sweep!");
})

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);


app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});