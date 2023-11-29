const Board = require('../models/board');
const User = require('../models/user');
const { Op, Sequelize } = require('sequelize');

exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - zipzoong' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - zipzoong' });
};

exports.renderMain = async(req, res, next) => {
  try {
    const boards = await Board.findAll({
      include: {
        model: User,
        attributes: ['id', 'nick'],
      },
      order: [['createdAt', 'DESC']]
    })
 
      res.render('board', {
        title: 'zipzoong',
        twits: boards,
      });
    } catch(error) {
      console.log(error);
      next(error);
    }
  };

  exports.renderSearch = async(req, res, next) => {
    const query = req.query.search; // 검색  html name="search"
    if(!query) {  // 검색 결과 없으면 메인화면으로
      return res.redirect('/');
    }
    try {
      const address = await Board.findAll({ where: {address: {
        [Op.or]: [
          Sequelize.literal(`address LIKE '%${query}%'`),
          Sequelize.literal(`address.sido LIKE '%${query}%'`),
          Sequelize.literal(`address.gugun LIKE '%${query}%'`),
          Sequelize.literal(`address.dong LIKE '%${query}%'`),
        ]
      }}});
      let boards = [];
      if (address) {
        boards = await address.getBoards({
          include: [{ model: User, attributes: ['id', 'nick']}, 
        {
          model: Board,
          attributes: ['size', 'address.dong', 'deposit', 'monthpay', 'title']
        }],
          order: [['createdAt', 'DESC']]
        });
      }
      res.render('main', {
        title: `${query} | zipzoong`,
        boards: boards,
      })
    } catch (error) {
      console.error("해당 주소의 게시글이 없습니다.");
      next(error);
    }
  };

  exports.myPageInLike = async (req, res, next) => {
    try {
      const board = await Board.findAll({ where: {id: req.params.id }});

      let boards = [];
      if (boards) {
        boards = await boards.getBoards({
          include: {
            model: Board,
            attributes: [ 'title', 'deposit', 'monthPay', 'maintenance']
          },
          order: [['createdAt', 'DESC']]
        });
      }
      res.render('myPageInLike', {
      title: 'Likes',
      likedBoards: likedBoards,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  };