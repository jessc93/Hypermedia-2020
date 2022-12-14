var express = require('express');
const router = express.Router();
const seq = require('../sequelize');
const Cart = seq.Cart;
const Artistic = seq.Artistic;
const isLogged = require('../middlewares/isLogged');

router.post('/show', isLogged, async (req, res) => {
  const user_id = req.body.user_id;
  const carts = await Cart.findAll({ where: { userId: user_id } });
  const final = [];
  for (let ticket of carts) {
    final.push({
      data: await Artistic.findOne({ where: { id: ticket.artisticId } }),
      count: ticket.count,
    });
  }
  res.json(final);
});

router.post('/add', isLogged, async (req, res) => {
  const artisticId = req.body.eventId;
  const user_id = req.body.user_id;
  const [model, created] = await Cart.findOrCreate({
    where: { userId: user_id, artisticId },
    defaults: {
      count: 1,
    },
  });
  if (!created) {
    model.count += 1;
    await model.save();
  }
  res.send('ok');
});

//remove all items from cart
router.post('/pay', isLogged, (req, res) => {
  const id = req.body.user_id;
  Cart.destroy({ where: { userId: id } }).then(() => {
    res.sendStatus(200);
  });
});

//remove item from cart
router.delete('/remove', isLogged, (req, res) => {
  Cart.destroy({
    where: {
      artisticId: req.body.deleteId,
      userId: req.body.user_id,
    },
  }).then((user) => res.json(user));
});

module.exports = {
  router: router,
};
