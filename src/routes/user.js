const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { connect, disconnect, profile, uploadImage } = require('../controllers/user');

try {
    fs.readdirSync('users');
} catch (error) {
    console.error('users폴더가 없어 폴더를 생성합니다.');
    fs.mkdirSync('users');
}

const profileImg = multer = ({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'users/')
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext );
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024},
});

// POST /user/:id/connect
router.post('/:id/connect', isLoggedIn, connect);

// POST /user/:id/unconnect
router.post('/:id/unconnect', isLoggedIn, disconnect);

router.post('/profile', profile);


router.post('/img', isLoggedIn, profileImg.single('img'), uploadImage);

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), profile);

module.exports = router;