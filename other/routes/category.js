var express = require('express');
const router = express.Router();
const seq = require('../sequelize');
const Category = seq.Category;
const isLogged = require('../middlewares/isLogged');

router.get('/', (req, res) => {
  Category.findAll().then((cat) => res.json(cat));
});

module.exports = {
  router: router,
};
