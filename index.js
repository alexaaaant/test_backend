const configuration = require('./knexfile')['development'];
let express = require('express');
const database = require('knex')(configuration);
let app = express();

app.get('/api/get', (request, response) => {
	database('db').select()
		.then((network) => {
			response.status(200).json(network);
		})
		.catch((error) => {
			response.status(500).json({ error });
		});
});

app.listen(3001, function () {
	console.log('Example app listening on port 3000!');
});

