var knex = require('knex')({
	client: 'pg',
	connection: {
		host : 'pg',
		user : 'dbadmin',
		password : 'dbadmin',
		database : 'db',
		port: '5432'
	}
});

export default knex