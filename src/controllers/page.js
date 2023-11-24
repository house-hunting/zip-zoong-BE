exports.renderProfile = (req, res) => {
    res.render('profile', { title: '내 정보 - zipzoong' });
};

exports.renderJoin = (req, res) => {
    res.render('join', { title: '회원가입 - zipzoong' });
};

exports.renderMain = (req, res, next) => {
  try {

 
    const twits = [];
    res.render('main', {
      title: 'zipzoong',
      twits,
    });
  } catch(error) {
    console.log(error);
    next(error);
  }
  };