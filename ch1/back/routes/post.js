const express = require("express");
const multer = require("multer");
const { isLoggedIn } = require("./middlewares");
const path = require("path"); // 노드 제공이라 설치X

const db = require("../models");
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

router.post("/", isLoggedIn, async (req, res, next) => {
    try {
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const newPost =  await db.Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        if(hashtags) {
            const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
                where: { name: tag.slice(1).toLowerCase() },
            })));
            await newPost.addHashtags(result.map(r => r[0]));
        }
        const fullPost = await db.Post.findOne({
            where: { id: newPost.id },
            include: [{
                model: db.User,
                attributes: ["id", "nickname"],
            }],
        })
        return res.json(fullPost);
    }catch(err) {
        console.error(err);
        next(err)
    }
});

router.get("/:id/comments", async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where : { id: req.params.id }});
        if(!post) {
            return res.status(404).send("포스트가 존재하지 않습니다.");
        }
        const comments = await db.Comment.findAll({
            where: {
                PostId: req.params.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
            // 정렬. 2차원배열로 하는 이유는 2번째 정렬 이유가 있을 수 있기때문.
            order: [['createdAt', 'ASC']],
        });
        res.json(comments);

    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.post("/:id/comment", isLoggedIn, async (req,res,next) => {
    try{
        // 현재 들어온 게시글이 존재하는지? param.id로 찾기
        const post = await db.Post.findOne({
            where : { id: req.params.id }
        })
        // 없다면 404리턴
        if(!post) {
            return res.status(404).send("포스트가 존재하지 않습니다.");
        }

        // Comment테이블에 데이터입력. id는 자동으로 만들어지고
        // Comment테이블과 연결된 post, user 테이블에 자동으로 
        // 댓글의 id값이 저장된다.
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });

        // 댓글이 db에 저장되었다면 방금 저장한 db의 id값으로 
        // 해당 데이터를 검색한다. 
        const comment = await db.Comment.findOne({
            where: {
                id: newComment.id,
            },

            // model로 저장한 댓글 데이터와 연결된 User 테이블의 정보를 꺼낸다
            // 연결된 User 테이블의 id, nickname 값만 프론트단에 리턴한다
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        return res.json(comment);
    }catch(err) {
        next(err);
    }
})

module.exports = router;