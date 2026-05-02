const express = require('express');
const router = express.Router();
const { generateDashboardConfig } = require('../controllers/generatorController');

router.post('/', generateDashboardConfig);

module.exports = router;
