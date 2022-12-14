var express = require('express');
const router = express.Router();
const seq = require('../sequelize');
const Seminar = seq.Seminar;
const Artistic = seq.Artistic;
const isLogged = require('../middlewares/isLogged');

router.get('/', (req, res) => {
  Seminar.findAll().then((seminars) => res.json(seminars));
});

router.get('/:id', (req, res) => {
  Seminar.findOne({
    where: {
      id: req.params.id,
    },
  }).then(async (seminar) => {
    seminar = seminar.dataValues;
    let artistic = await Artistic.findAll({ where: { seminarId: seminar.id } });
    let data = {
      artistic,
      seminar,
    };
    res.json(data);
  });
});

module.exports = {
  router: router,
};
