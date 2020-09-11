const express = require('express');
const router = express.Router();
const {findAll, findById, save, updateById, playGame} = require('../controllers/games');

router.get('/', findAll);
router.get('/:gameId', findById);
router.post('/', save);
router.put('/:gameId', updateById);
router.post('/:gameId/play', playGame);

module.exports = router;
