const express = require('express');
const { Like } =require('../controllers/board');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderBoardList, renderSearch, myPageInLike, renderBoardDetail, myBoardList } = require('../controllers/page');


const router = express.Router();

router.get('/profile', isLoggedIn, renderProfile)

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/boardList', renderBoardList);

router.get('/search', renderSearch);

router.get('/Like', Like, myPageInLike);

router.get('/boardDetail', isLoggedIn, renderBoardDetail);

router.get('/myBoardList', isLoggedIn, myBoardList);

module.exports = router;