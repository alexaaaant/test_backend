import knex from './knex'
import bodyParser from 'body-parser'

let express = require('express')
let app = express()
let cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

app.get('/api/get', (request, response) => {
	knex.raw('SELECT * from network WHERE length(route) = 1 ORDER BY id')
		.then((nodes) => {
			let nodesObj = {}
			nodes.rows.forEach((node) => {
				nodesObj[node.route] = {
					name: node.name,
					id: node.id,
					ip: node.ip,
					port: node.port,
					child_nodes: {},
					hide: true,
					loaded: false
				}
			})
			response.status(200).json(nodesObj)
		})
		.catch((error) => {
			console.log(error)
			response.status(500).json({error})
		})
})

app.get('/api/get/node', (request, response) => {
	let route = request.query.route
	knex.raw(`SELECT * from network WHERE route LIKE '${route}._' ORDER BY id`)
		.then((nodes) => {
			let nodesObj = {}
			nodes.rows.forEach((node) => {
				nodesObj[node.route] = {
					name: node.name,
					id: node.id,
					ip: node.ip,
					port: node.port,
					child_nodes: {},
					hide: true,
					loaded: false
				}
			})
			response.status(200).json(nodesObj)
		})
		.catch((error) => {
			console.log(error)
			response.status(500).json({error})
		})
})

app.post('/api/post/node', async (request, response) => {
	let body = request.body
	let route = request.query.route
	let count = await knex.raw(`SELECT COUNT(*) from network WHERE route LIKE '${route}._'`)
	let childNumber = String(Number(count.rows[0].count) + 1)
	let newRoute = route+'.'+childNumber
	knex.raw(`INSERT INTO network (name, ip, port, route ) VALUES ('${body.name}','${body.ip}',${body.port},'${newRoute}')`)
		.then(() => {
			response.status(200).json(newRoute)
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
	let route = req.query.route
	knex.raw(`UPDATE network SET (name, ip, port) = ('${body.name}','${body.ip}', ${Number(body.port)}) WHERE route = '${route}'`)
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

