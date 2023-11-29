const Board = require('../models/board');
const Address = require('../models/address');

exports.afteruploadImage = (req, res) => {
    res.json({ url: `/img/${req.file.filename}`});
};

exports.uploadBoard = async(req, res) => {
    try {
        const { size, address, pyeong, style, paied, monthPay, deposit, maintenance, moveDate, floor, elevator, parking, options, title, content, img } = req.body;
        
        const board = await Board.create({
            size,
            sido: address.sido,
            gugun: address.gugun,
            dong: address.dong,
            pyeong,
            style,
            paied,
            monthPay,
            deposit,
            maintenance,
            moveDate,
            floor,
            elevator,
            parking,
            options,
            title,
            content,
            img: imgArray,
            UserId: req.user.id,
        });
        const boards = req.body.content.match(/[^\s]*/g);
        if(boards) {
            const result = await Promise.all(boards.map((search) => {
                return Address.findOrCreate({
                    where: { address: search.slice(1).toLowerCase() }
                });
            }));
            console.log(result);
            await board.setAddresses(result.map(r => r[0]));
        }
        await board.save();
        res.status(201).json({ board });
    } catch(error) {
        console.log(error);
        next(error);
    }
};

exports.deleteBoard = async (req, res, next) => {
    try {
       await Board.destroy({ where: {id: req.params.id, userid: req.user.id }});
       res.send('게시글을 삭제했습니다.');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 게시물 좋아요
exports.Like = async (req, res, next) => {
    try {
        const board = await Board.findAll({ where: {id: req.params.id }});
        await board.addLike(req.user.id);
        res.send('매물 좋아요');
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.unLike = async (req, res, next) => {
    try {
        const board = await Board.findAll({ where: {id: req.params.id }});
        await board.removeLike(req.user.id);
        res.send('매물 좋아요 취소');
    } catch (error) {
        console.error(error);
        next(error);
    }
};
