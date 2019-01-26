import knex from './knex'
import bodyParser from 'body-parser'

let express = require('express')
let app = express()

app.use(bodyParser.json())

app.get('/api/get', (request, response) => {
	knex('network').select()
		.then((network) => {
			response.status(200).json(network)
		})
		.catch((error) => {
			console.log(error)
			response.status(500).json({error})
		})
})

app.get('/api/get/node', (request, response) => {
	let route = request.query.route
	knex.raw(`SELECT * from network WHERE route LIKE '${route}._'`)
		.then((network) => {
			response.status(200).json(network.rows)
		})
		.catch((error) => {
			console.log(error)
			response.status(500).json({error})
		})
})

app.post('/api/post/node', async (request, response) => {
	let body = request.body
	let count = await knex.raw(`SELECT COUNT(*) from network WHERE route LIKE '${body.route}._'`)
	let childNumber = String(Number(count.rows[0].count) + 1)
	knex.raw(`INSERT INTO network (name, ip, port, route ) VALUES ('${body.name}','${body.ip}',${body.port},'${body.route}.${childNumber}')`)
		.then((network) => {
			response.status(200).json(network.rows)
		})
		.catch((error) => {
			console.log(error)
			response.status(500).json({error})
		})
})

app.delete('/api/delete/node', (req, res) => {
	knex.raw(`DELETE FROM network WHERE route LIKE '${req.query.route}%'`)
		.then((network) => {
			res.status(200).json(network)
		})
		.catch(e => {
			console.log(e)
			res.status(500)
		})
})

app.patch('/api/patch/node', (req, res) => {
	let body = req.body
	knex.raw(`UPDATE network SET (name, ip, port) = ('${body.name}','${body.ip}', ${body.port}) WHERE route = '${body.route}'`)
		.then((network) => {
			res.status(200).json(network)
		})
		.catch(e => {
			console.log(e)
			res.status(500)
		})
})


app.listen(3001, function () {
	console.log('Example app listening on port 3001!')
})

