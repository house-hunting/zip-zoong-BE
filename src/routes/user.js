const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { connect } = require('../controllers/user');

const router = express.Router();

// POST /user/:id/follow
router.post('/:id/connect', isLoggedIn, connect);

module.exports = router;