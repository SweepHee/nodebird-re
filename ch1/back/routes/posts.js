const express = require("express");
const multer = require("multer");
const path = require("path"); // 노드 제공이라 설치X

const db = require("../models");

const router = express.Router();


router.get("/", async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                attributes: ["id", "nickname"],
            }],
            order: [["createdAt", "DESC"]],
            offset: parseInt(req.query.offset,10) || 0, // req.query.~ 쿼리스트링. 주소에 offset=10&a=b 이렇게 붙는것들
            limit: parseInt(req.query.limit, 10) || 10,
        })
        res.json(posts);
    } catch(err) {
        console.error(err);
        next(err);
    }
})


module.exports = router;