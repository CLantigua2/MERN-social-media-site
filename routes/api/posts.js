const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

router.get('/test', (req, res) => {
	res.send(200).json({ message: 'Posts works' });
});

module.exports = router;
