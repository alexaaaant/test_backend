var knex = require('knex')({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'dbadmin',
		password : 'dbadmin',
		database : 'db',
		port: '5433'
	}
});

export default knex