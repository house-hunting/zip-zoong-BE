import Sequelize from "sequelize";

class Address extends Sequelize.Model {
    static init(sequelize) {
        Address.init({
            zip_num: { 
                type: Sequelize.STRING(10),
                allowNull: false,   // 비어있어도 되는지 flase
            },
            sido: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            gugun: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            dong: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            zipcode: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            bunji: {
                type: Sequelize.STRING(30),
                allowNull: false,
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
        db.Address.belongToMany(db.Room, { through: 'RoomAddress' });
    }
}