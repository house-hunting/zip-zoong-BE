import Sequelize from "sequelize";

class Room extends Sequelize.Model {
    static init(sequelize) {
        Room.init({
            size: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING(60),
                allowNull: true,
            },
            pyeong: {
                type: Sequelize.INTEGER,
                allowNull: true,
            }
        })
    }
}