import Room from "../models/room";
import User from "../models/user";

exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - zipzoong' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - zipzoong' });
};

exports.renderBoard = async(req, res, next) => { // 게시시판 파일로 이름으로 바꾸기
  try {
    const rooms = await Room.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']]
    })
 
      res.render('board', {  // 게시시판 파일로 이름으로 바꾸기
        title: 'zipzoong',
        twits: rooms,
      });
    } catch(error) {
      console.log(error);
      next(error);
    }
  };