import express from "express";
const router = express.Router();
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import fs from "fs"
import multer from "multer";
import path from "path";
import { afteruploadImage, uploadBoard } from "../controllers/room";

try {
    fs.readdirSync('uploads');  // fs = 파일조작 readdirSync()안의 폴더를 있는지
} catch (error) {
    console.error("upload폴더가 없어 폴더를 생성합니다.")
    fs.mkdirSync('uploads');    // 폴더를 만들어낸다
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/')    // uploads 폴더에다 저장하겠다
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024},
});

router.post('/img', isLoggedIn, upload.array('img'), afteruploadImage);

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadBoard);

export default router;