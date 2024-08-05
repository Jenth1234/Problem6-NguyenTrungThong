const express = require('express');
const router = express.Router();
const scoreController = require('../../controllers/scoreController');
const {verifyToken} = require('../../middleware/verifyToken');
router.get('/top10user', scoreController.getTop10Users);
router.post('/updateScore',verifyToken, scoreController.updateScore);
module.exports = router;