var express = require('express');
const router = express.Router();
const seq = require('../sequelize');
const Performer = seq.Performer;
const ArtisticPerformer = seq.ArtisticPerformer;
const Artistic = seq.Artistic;
const isLogged = require('../middlewares/isLogged');

router.get('/', (req, res) => {
  Performer.findAll().then((performers) => res.json(performers));
});

router.get('/:id', (req, res) => {
  Performer.findOne({
    where: {
      id: req.params.id,
    },
  }).then(async (performer) => {
    performer = performer.dataValues;
    let ap = await ArtisticPerformer.findAll({
      where: { performerId: performer.id },
      include: [
        {
          model: Artistic,
        },
      ],
    });
    let artistics = ap.map((el) => el.dataValues.artistic);
    let data = {
      artistics,
      performer,
    };
    res.json(data);
  });
});

module.exports = {
  router: router,
};
