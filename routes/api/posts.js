const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Validation

router.get('/test', (req, res) => {
	res.send(200).json({ message: 'Posts works' });
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.name,
		user: req.user.id
	});

	newPost.save().then((post) => res.json(post));
});

module.exports = router;
