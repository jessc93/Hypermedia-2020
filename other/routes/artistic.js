var express = require('express');
const router = express.Router();
const seq = require('../sequelize');
const Artistic = seq.Artistic;
const Seminar = seq.Seminar;
const Performer = seq.Performer;
const ArtisticPerformer = seq.ArtisticPerformer;
const isLogged = require('../middlewares/isLogged');

router.get('/', (req, res) => {
  Artistic.findAll().then((artistics) => res.json(artistics));
});

router.get('/calendar', async (req, res) => {
  let artistics = await Artistic.findAll({ order: [['date']] });
  artistics = artistics
    .map((el) => el.dataValues)
    .map((el) => {
      el.type = 'artistic';
      return el;
    });
  let seminars = await Seminar.findAll({ order: [['date']] });
  seminars = seminars
    .map((el) => el.dataValues)
    .map((el) => {
      el.type = 'seminar';
      return el;
    });
  let fin = {};
  Array.from(
    new Set(
      artistics
        .concat(seminars)
        .sort((a, b) => a.date - b.date)
        .map((el) => el.date),
    ),
  ).map((el) => (fin[el] = { artistic: [], seminar: [] }));
  artistics.map((el) => fin[el.date].artistic.push(el));
  seminars.map((el) => fin[el.date].seminar.push(el));
  res.json(fin);
});

router.get('/all', async (req, res) => {
  const artistics = await Artistic.findAll()
    .map((el) => el.dataValues)
    .map((el) => {
      el.type = 'artistic';
      return el;
    });
  const seminars = await Seminar.findAll()
    .map((el) => el.dataValues)
    .map((el) => {
      el.type = 'seminar';
      return el;
    });
  res.json({ artistics, seminars });
});

router.get('/:id', (req, res) => {
  Artistic.findOne({
    where: {
      id: req.params.id,
    },
  }).then(async (artistic) => {
    artistic = artistic.dataValues;
    let seminar = await Seminar.findOne({ where: { id: artistic.seminarId } });
    let ap = await ArtisticPerformer.findAll({
      where: { artisticId: artistic.id },
      include: [
        {
          model: Performer,
        },
      ],
    });
    let performers = ap.map((el) => el.dataValues.performer);
    let sameDate = await Artistic.findAll({ where: { date: artistic.date } });
    sameDate = sameDate.filter((el) => el.id != artistic.id);
    let data = {
      seminar,
      artistic,
      performers,
      sameDate,
    };
    res.json(data);
  });
});

module.exports = {
  router: router,
};
