const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderMain, renderSearch, myPageInLike } = require('../controllers/page');


const router = express.Router();

router.get('/profile', isLoggedIn, renderProfile)

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/', renderMain);

router.get('/search', renderSearch);

router.get('/mypage/Like', myPageInLike);

module.exports = router;