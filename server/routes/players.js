const express = require('express');
const router = express.Router();
const playerController = require('../controllers/players');

router.get('/', playerController.findAll);
router.get('/:playerId', playerController.findById);
router.post('/', playerController.save);
router.put('/:playerId', playerController.updateById);

module.exports = router;
