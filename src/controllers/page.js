import Room from "../models/room";
import User from "../models/user";

exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - zipzoong' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - zipzoong' });
};

exports.renderUser = async(req, res, next) => {
  try {
    const rooms = await Room.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']]
    })
 
      res.render('board', {
        title: 'zipzoong',
        twits: rooms,
      });
    } catch(error) {
      console.log(error);
      next(error);
    }
  };