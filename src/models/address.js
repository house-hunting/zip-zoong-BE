import Sequelize from "sequelize";

class Address extends Sequelize.Model {
    static init(sequelize) {
        Address.init({
            si: {    // 게시글 제목
                type: Sequelize.STRING(50),
                allowNull: false,   // 비어있어도 되는지 flase
            },
            gu: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            dong: {
                type: Sequelize.STRING(50),
                allowNull: false,
            }
            
        })
    }
}