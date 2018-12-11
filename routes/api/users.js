const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../../models/User');

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

module.exports = router;