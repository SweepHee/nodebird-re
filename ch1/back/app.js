const express = require("express");
const db = require("./models");
const app = express();

db.sequelize.sync(); // db 실행

/* ---------- middleware ---------- */
// body parser
app.use(express.json()); // express는 json 요청을 못받아서 선언해줘야 한다! 파싱
app.use(express.urlencoded({ extended: false })); // form 데이터를 받아준다

app.get("/", (req, res) => {
    res.send("안녕 Sweep!");
})

app.post("/user", async (req,res, next) => {
    try {
        const newUser = await db.User.create({
            email: req.body.email,
            password: req.body.password,
            nickname: req.body.nickname,
        });

        // HTTP STATUS CODE 201 : 성공적으로 생성됨. 
        res.status(201).json(newUser); // body에 josn으로 응답. 문자열은 send();
    }catch(err) {
        console.log(err);
        next(err);
    }
 
});

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});