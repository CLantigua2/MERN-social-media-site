const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Validation
const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => {
	res.send(200).json({ message: 'Posts works' });
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	// Check validation
	if (!isValid) {
		// if any errors, send 400 with errors object
		return res.status(400).json(errors);
	}
	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});

	newPost.save().then((post) => res.json(post));
});

// @route POST api/posts
// @desc Create post
// @access Private

module.exports = router;
