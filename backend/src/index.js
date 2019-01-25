// const configuration = require('./knexfile')['development'];
import knex from './knex'

let express = require('express');
let app = express();

app.get('/api/get', (request, response) => {
	knex.raw("SELECT * from network")
		.then((network) => {
			response.status(200).json(network);
		})
		.catch((error) => {
			console.log(error)
			response.status(500).json({ error });
		});
});

app.listen(3001, function () {
	console.log('Example app listening on port 3001!');
});

