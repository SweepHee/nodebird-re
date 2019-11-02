// db에서 table이라고 생각하면 됨. 시퀄라이즈에선 model이라고 한다! orm이라고 부른다.
module.exports = (sequelize, DataTypes) => {
    // 첫번째 객체. table data값 설정. id, createdAt, updatedAt 자동으로 생성된다
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING(40), // 40자 이내
            allowNull: false, // 필수
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        // 두번째 객체. table 설정
        charset: "utf8",
        collate: "utf8_general_ci", // 한글 사용가능
    });
    User.associate = (db) => {
        
    };
    return User;
};