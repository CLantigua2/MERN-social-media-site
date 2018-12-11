const express = require('express');
const mongoose = require('mongoose');
const server = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB through mongoose
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connect'))
	.catch((err) => console.log(err));

server.use(express.json());
server.get('/', (req, res) => {
	res.send({ message: 'server is alive' });
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
	console.log(`This server is over ${port}`);
});
