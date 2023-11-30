const Sequelize = require('sequelize');


class Board extends Sequelize.Model {
    static initiate(sequelize) {
        Board.init({
            seq: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            size: { // 원룸, 투룸인지
                type: Sequelize.ENUM('0', '1'),    // 원룸 0, 투름 1
                allowNull: false,   
                defaultValue: '0',  // 기본값은 0
            },
            address: {  // 주소
                type: Sequelize.STRING(60),
                allowNull: true,
            },
            pyeong: {   // 평수
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            style:{ // 방 타입
                type: Sequelize.ENUM('0', '1', '2'),    // 오픈형 0, 분리형 1, 복층형 2
                allowNull: false,   
                defaultValue: '0',  // 기본값은 0
            },
            paied: {    // 월세, 전세 인지
                type: Sequelize.ENUM('0', '1'),    // 월세 0, 전세 1
                allowNull: false,   
                defaultValue: '0',  // 기본값은 0
            },
            monthPay: { // 월세
                type: Sequelize.INTEGER,
                allowNull: false,   
                defaultValue: '0',  // 기본값은 0
            },
            deposit: {  // 보증금
                type: Sequelize.INTEGER,
                allowNull: false,   
            },
            maintenance: {  // 관리비
                type: Sequelize.ENUM('0', '1'), // 0 없음, 1 있음
                allowNull: false,   
                defaultValue: '0',  // 기본값은 0
            },
            valueForOption1: {  // 관리비 있음을 체크하면
                type: Sequelize.INTEGER,    // 정수입력
                allowNull: true,    // 필수입력
            },
            moveDate: { // 입주가능 일자
                type: Sequelize.ENUM('0', '1'), // 0즉시입주, 1 날짜입력
                allowNull: false,
                defaultValue: '0',  // 기본값은 0 즉시입주
            },
            valueForOption2: {  // 1을 선택했을때
                type: Sequelize.DATEONLY,   // 년 월 일 입력해야됨
                allowNull: false,    // 필수입력
            },
            floor: {    // 층 입력
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            elevator: { // 엘리베이터 유무
                type: Sequelize.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '0',
            },
            parking: {  // 주차 가능여부
                type: Sequelize.ENUM('0', '1'),
                allowNull: false,
                defaultValue: '0',
            },
            valueForOption3: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            options: {
                type: Sequelize.ENUM('0', '1', '2', '3', '4', '5'),
                allowNull: true,
            },
            img: {
                type: Sequelize.Sequelize.STRING(200),
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            content: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Board',
            tableName: 'board',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Board.belongsTo(db.User);
        db.Board.belongsToMany(db.Address, {through: 'BoardAddress'});
        db.Board.belongsToMany(db.User, { through: 'Like', as: 'Liker'});
    }
};

module.exports = Board;