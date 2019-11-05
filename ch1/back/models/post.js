module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
    });
    Post.associate = (db) => {
       db.Post.belongsTo(db.User); // belongsTo를 붙이면 컬럼에 UserId가 하나 더 생긴다
       db.Post.hasMany(db.Comment);
       db.Post.hasMany(db.Image);
       db.Post.belongsToMany(db.Hashtag, {through: "PostHashtag"});
    };
    return Post;
};
