const express = require('express');

// **
const generateImageController = require('../../controllers/generateImage.controller.js');

const router = express.Router();

router.post('/', generateImageController);

module.exports = router;
