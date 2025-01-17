exports.seed = function (knex, Promise) {
	// Deletes ALL existing entries
	return knex('network').del()
		.then(function () {
			// Inserts seed entries
			return knex('network').insert([
				{name: 'center.inobitec (nginx)', ip: '170.1.1.0', port: 7170, route: '1'},
				{name: 'ural.inobitec (nginx)', ip: '170.2.1.0', port: 7270, route: '2'},
				{name: 'far-east.inobitec (nginx)', ip: '170.3.1.0', port: 7370, route: '3'},
				{name: 'control node', ip: '170.1.2.0', port: 7070, route: '1.1'},
				{name: 'node js server 1', ip: '170.1.1.0', port: 7070, route: '1.2'},
				{name: 'node js server 2', ip: '170.1.1.0', port: 7070, route: '1.1.1'},
				{name: 'node js server 3', ip: '170.1.1.0', port: 7070, route: '1.2.1'},
				{name: 'node js server 4', ip: '170.1.1.0', port: 7070, route: '2.1'},
				{name: 'node js server 5', ip: '170.1.1.0', port: 7070, route: '2.1.1'},

			])
		})
}