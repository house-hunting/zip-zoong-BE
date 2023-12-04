const Sequelize = require('sequelize');


class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,    // 필수가 아닌경우 true 핑수면 false
                unique: true,   // 다른 User와 같으면 안됨
            },
            nickName: {
                type: Sequelize.STRING(20),
                allowNull: true,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.User.hasMany(db.Board);
        db.User.belongsToMany(db.User, {
            foreignKey: 'connectId',
            as: 'Connecter',
            through: 'Connect'
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'connecterId',
            as: 'Connecting',
            through: 'Connect'
        });
        db.User.belongsToMany(db.Board, { through: 'Like' });
    }
};

module.exports = User;