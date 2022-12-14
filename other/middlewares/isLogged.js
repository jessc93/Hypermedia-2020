const Auth = require('../sequelize').Auth;

module.exports = (req, res, next) => {
  const { token, user_id } = req.body;
  if (!token || !user_id) {
    return res.redirect('../login.html');
  }
  Auth.findAll({ where: { token, id: user_id } }).then((auth) => {
    if (auth.length === 0) {
      return res.redirect('../login.html');
    }
    return next();
  });
};
