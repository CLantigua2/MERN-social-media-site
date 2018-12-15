const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');
// generate web token

const generateToken = (user) => {
	const payload = {
		id: user.id,
		name: user.name,
		avatar: user.avatar
	};
	const secret = keys.secretOrKey;
	const options = {
		expiresIn: 3600
	};
	return jwt.sign(payload, secret, options);
};

/////// test the route
router.get('/test', (req, res) => {
	res.send(200).json({ message: 'Users works' });
});

// @route   GET api/user/register
// @desc    register a user
// @access  Public
// register a user with name, email, avatar if the account has one, password
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	// check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const creds = req.body;
	User.findOne({ email: creds.email })
		.then((user) => {
			if (user) {
				errors.email = 'Email already exists';
				return res.status(400).json(errors);
			} else {
				const avatar = gravatar.url(creds.email, {
					s: '200', //size
					r: 'pg', // rating
					d: 'mm' // Default
				});
				const newUser = new User({
					name: creds.name,
					email: creds.email,
					avatar,
					password: creds.password
				});

				//hash password
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then((user) => {
								res.json(user);
							})
							.catch((err) => console.log(err));
					});
				});
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Something broke bruhh', err });
		});
});

/////// log in user
router.post('/login', (req, res) => {
	// validates input that comes through req.body
	const { errors, isValid } = validateLoginInput(req.body);
	// check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	// Find user by email with mongoose user model
	User.findOne({ email }).then((user) => {
		// Check for a user
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}
		// check Password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// user matched
				// create payload
				const token = generateToken(user);
				res.json({
					success: true,
					token: 'Bearer ' + token
				});
			} else {
				errors.password = 'Credentials do not match';
				return res.status(400).json(errors);
			}
		});
	});
});

// returns current user based on token
// will be set to private
router.get(
	'/current',
	passport.authenticate('jwt', {
		session: false
	}),
	(req, res) => {
		res.json({
			id: req.user.id,
			name: req.user.name,
			email: req.user.email
		});
	}
);

module.exports = router;
