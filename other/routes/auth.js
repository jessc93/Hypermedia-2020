var express = require('express');
const seq = require('../sequelize');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const Auth = seq.Auth;
const User = seq.User;
const crypto = require('crypto');
const isLogged = require('../middlewares/isLogged');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const hash = crypto
    .createHash('sha256')
    .update(password)
    .digest('hex');
  const data = {
    email,
    password: hash,
  };
  User.findOne({ where: data }).then((user) => {
    if (user) {
      user = user.dataValues;
      const token = uuidv4();
      Auth.findOrCreate({
        where: { id: user.id },
        defaults: {
          token,
        },
      }).then(([auth, _]) => {
        auth = auth.dataValues;
        auth.name = user.name;
        res.json(auth);
      });
    } else {
      res.json({ data, status: 'error' });
    }
  });
});

router.post('/logout', isLogged, async (req, res) => {
  const { user_id } = req.body;
  const found = await Auth.findOne({ where: { id: user_id } });
  if (found) {
    await found.destroy({ where: { id: user_id } });
  }
  res.send('ok');
});

module.exports = {
  router: router,
};
