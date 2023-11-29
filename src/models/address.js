const Sequelize = require('sequelize');

class Address extends Sequelize.Model {
    static initiate(sequelize) {
        Address.init({
            zip_num: { 
                type: Sequelize.STRING(10),
                allowNull: false,   // 비어있어도 되는지 flase
            },
            sido: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            gugun: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            dong: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            zipcode: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            bunji: {
                type: Sequelize.STRING(30),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Address',
            tableName: 'address',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db){
        db.Address.belongsToMany(db.Board, { through: 'BoardAddress' });
    }
}

module.exports = Address;