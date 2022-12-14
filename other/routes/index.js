const express = require('express');
const router = express.Router();

router.use('/api/artistic', require('./artistic').router);
router.use('/api/performer', require('./performer').router);
router.use('/api/seminar', require('./seminar').router);
router.use('/api/cart', require('./cart').router);
router.use('/api/category', require('./category').router);
router.use('/api/user', require('./user').router);
router.use('/api/auth', require('./auth').router);

module.exports = router;
