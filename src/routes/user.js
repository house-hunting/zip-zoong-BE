const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { connect, disconnect, profile } = require('../controllers/user');

const router = express.Router();

// POST /user/:id/connect
router.post('/:id/connect', isLoggedIn, connect);

// POST /user/:id/unconnect
router.post('/:id/unconnect', isLoggedIn, disconnect);

router.post('/profile', profile);

module.exports = router;