const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load User Model
const User = require('../../models/User');
// generate web token

const generateToken = (user) => {
	const payload = {
		id: user.id,
		name: user.name,
		avatar: user.avatar
	};
	const secret = keys.jwtSECRET;
	const options = {
		expiresIn: '1h'
	};
	return jwt.sign(payload, secret, options);
};

router.get('/test', (req, res) => {
	res.send(200).json({ message: 'Users works' });
});

// register a user with name, email, avatar if the account has one, password
router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (user) {
				return res.status(400).json({ email: 'Email already exists' });
			} else {
				const avatar = gravatar.url(req.body.email, {
					s: '200', //size
					r: 'pg', // rating
					d: 'mm' // Default
				});
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar,
					password: req.body.password
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
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email with mongoose user model
	User.findOne({ email }).then((user) => {
		// Check for a user
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		// check Password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// user matched
				// create payload
				// const payload = { id: user.id, name: user.name, avatar: user.avatar };
				const token = generateToken(user);
				// assign token
				res.status(200).json({ message: 'welcome', token });
			} else {
				return res.status(400).json({ message: 'credentials do not match' });
			}
		});
	});
});

// returns current user based on token
// will be set to private

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({ message: 'Success' });
});

module.exports = router;
