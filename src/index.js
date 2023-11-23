import express from'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import passport from 'passport';

dotenv.config();

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html');

nunjucks.comfigure('views', {   // 서버와 클라이언트를 연결 'views'라는 폴더 안에 있는 파일
    express: app, 
    watch: true,
});


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));    // 같은 위치에 있는 'public' 디렉토리(폴더)안에 있는 css 를 연결시켜준다
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    const error = new Error('${req.method} ${req.url} 라우터가 없습니다.');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENC !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});