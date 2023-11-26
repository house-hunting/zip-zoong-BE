import express from 'express';

import { isLoggedIn } from '../middlewares';
import { connect } from '../controllers/user'

const router = express.Router();

// POST /user/:id/follow
router.post('/:id/connect', isLoggedIn, connect);

export default router;