import express from "express";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import { renderProfile, renderJoin, renderUser} from "../controllers/page";

const router = express.Router();

router.get('/boardDetail', isLoggedIn, renderProfile)

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/board', isLoggedIn, renderUser);

router.get('/', isNotLoggedIn);

export default router;