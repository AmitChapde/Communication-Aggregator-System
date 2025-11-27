const express = require('express');
const router = express.Router();
const controller = require('../controllers/messageController');


router.post('/', controller.handleMessage);


module.exports = router;