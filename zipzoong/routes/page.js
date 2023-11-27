const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderMain, renderSearch } = require('../controllers/page');


const router = express.Router();

router.get('/boardDetail', isLoggedIn, renderProfile)

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/', renderMain);

router.get('/search', renderSearch);

module.exports = router;