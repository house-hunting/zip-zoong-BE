import passport from "passport";
import local from "./localUser";
import kakao from "./kakaoUser";
import User from "../models/user";

module.exports = () => {
    passport.serializeUser((user, done) => {    // passport 의 serializeUser 메서드 호출
        done(null, user.id);    // done = Passport에서 사용되는 콜백함수(첫 번째 인자는 에러, 두 번째 인자는 성공 시 결과 데이터)
    });

  passport.deserializeUser((id, done) => {
    console.log('deserialize');
    User.findOne({
      where: { id },
      include: [{ //나에게 말 건사람
        model: User,
        attributes: ['id', 'nick'],
        as: 'Connecter',
      }, {    // 내가 말건사람
        model: User,
        attributes: ['id', 'nick'],
        as: 'Connecting',
      }],
    })
      .then(user => {
        console.log('user', user);
        done(null, user);
       })
      .catch(err => done(err));
  });

  local();
  kakao();
};
