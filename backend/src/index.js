import knex from './knex'
import bodyParser from 'body-parser'

let express = require('express')
let app = express()
let cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

app.get('/api/node', async (req, res) => {
	knex.raw(` select *,(id in (select parent_id from network)) as hasChild from network where parent_id = ${req.query.parent_id} order by id`)
		.then((nodes) => {
			let newArray = nodes.rows.map((node) => { 
					node.hide = true
					node.loaded = false
					node.hasChild = node.haschild
					node.child_nodes = []
					return node
			})
			res.status(200).json(newArray)
		})
		.catch((e) => {
			res.status(500).json(e)
		})
})

app.post('/api/node', async (req, res) => {
	let body = req.body
	await knex.raw(`INSERT INTO network (name, ip, port, parent_id) VALUES ('${body.name}','${body.ip}',${body.port}, ${req.query.parent_id})`)
	knex.raw(`SELECT * from network WHERE ip = '${body.ip}'`)
		.then((node) => {
			node.rows[0].child_nodes = []
			res.status(200).json(node.rows[0])
		})
		.catch((e) => {
			res.status(500).json(e)
		})
})

app.delete('/api/node', (req, res) => {
	knex.raw(`WITH RECURSIVE r AS (
		SELECT id, parent_id, name
		FROM network
		WHERE id = '${req.query.nodeId}'
	 
		UNION ALL
	 
		SELECT network.id, network.parent_id, network.name
		FROM network
		   JOIN r
			   ON network.parent_id = r.id
	 )
	 
	 DELETE FROM network WHERE id IN (SELECT id from r)`)
		.then((network) => {
			res.status(200).json(network)
		})
		.catch(e => {
			res.status(500).json(e)
		})
})

app.patch('/api/node', (req, res) => {
	let body = req.body
	knex.raw(`UPDATE network SET (name, ip, port) = ('${body.name}','${body.ip}', ${Number(body.port)}) WHERE id = '${req.query.nodeId}'`)
		.then((network) => {
			res.status(200).json(network)
		})
		.catch(e => {
			res.status(500).json(e)
		})
})


app.listen(3001, function () {
	console.log('Example app listening on port 3001!')
})

