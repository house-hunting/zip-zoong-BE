import Sequelize from "sequelize";

class Board extends Sequelize.Model {
    static init(sequelize) {
        Board.init({
            address: {

            }
        })
    }
}