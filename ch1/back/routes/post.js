const express = require("express");
const multer = require("multer");
const { isLoggedIn } = require("./middlewares");
const path = require("path"); // 노드 제공이라 설치X

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({ // 저장위치. 개발중엔 프로젝트 내(디스크스토리지)
        destination(req, file, done) {
            done(null, "uploads");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 확장자명 뽑아내기
            const basename = path.basename(file.originalname, ext);
            // 게임.exe -> basename = 게임, ext = .exe
            done(null, basename + Date.now() + ext);

        },
    }),
    limit: { fileSize: 20 * 1024 * 1024 }, // 20mb제한
});
router.post("/images", isLoggedIn, upload.array("image"), (req, res) => {
    console.log(req.files);
    res.json(req.files.map(v => v.filename));
});

router.post("/", isLoggedIn, (req, res) => {

});

router.post("/images", isLoggedIn, (req,res) => {

});

module.exports = router;