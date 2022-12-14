var express = require('express');
const router = express.Router();
const seq = require('../sequelize');
const User = seq.User;
const isLogged = require('../middlewares/isLogged');
const crypto = require('crypto');

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user) {
      const hash = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
      User.create({ name, email, password: hash }).then(() =>
        res.json({ name, email, status: 'Created!' }),
      );
    } else {
      res.json({
        status: 'Error',
      });
    }
  });
});

module.exports = {
  router: router,
};
