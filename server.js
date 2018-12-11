const express = require(express);

const server = express();

server.get('/', (req, res) => {
	res.send({ message: 'server is alive' });
});

const port = process.env.PORT || 9000;
server.listen(port, () => {
	console.log(`This server is over ${port}`);
});
