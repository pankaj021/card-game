const express = require('express');
const router = express.Router();

router.get('/:id', (req, res, next) => {
    res.render('index');
});

module.exports = router;
