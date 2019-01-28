exports.seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex('network').del()
		.then(function () {
			// Inserts seed entries
			return knex('network').insert([
                {name: 'шлюз портала', ip: '1.1.1.1', port: 8080, route: '1'},
                {name: 'center.inobitec (nginx)', ip: '1.1.1.2', port: 8081, route: '1.1'},
				{name: 'ural.inobitec (nginx)', ip: '1.1.1.3', port: 8082, route: '1.1.1'},
				{name: 'far-east.inobitec (nginx)', ip: '1.1.1.4', port: 8083, route: '1.1.1.1'},
				{name: 'control node', ip: '1.1.1.5', port: 8084, route: '1.1.1.1.1'},
				{name: 'node js server 1', ip: '1.1.1.6', port: 8085, route: '1.2'},
				{name: 'node js server 2', ip: '1.1.1.7', port: 8086, route: '1.2.1'},
				{name: 'node js server 3', ip: '1.1.1.8', port: 8087, route: '1.2.2'},
				{name: 'node js server 4', ip: '1.1.1.9', port: 8088, route: '1.2.2.1'},
				{name: 'node js server 5', ip: '1.1.1.10', port: 8089, route: '1.3'},
			])
		})
}
