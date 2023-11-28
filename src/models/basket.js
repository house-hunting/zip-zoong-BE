const Sequelize = require('sequelize');

class Basket extends Sequelize.Model {
    static initiate(sequelize) {
        Basket.init({
            boardId: {
                type: Sequelize.INTEGER,
                unique: true,
            },
            current: {
                type: Sequelize.ENUM(0, 1), // 판매중이면 0, 판매완료면 1
                defaultValue: '0',
            }
        });
    }

    static associate(db) {
        db.Basket.belongsToMany(db.Board, { through: 'BasketBoard' });
        db.User.hasOne(db.Basket);
    }
};

module.exports = Basket;