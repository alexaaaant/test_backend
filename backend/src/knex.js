var knex = require('knex')({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		database: 'db',
		user: 'dbadmin',
		password: 'dbadmin',
		port:'5433',
	}
});

export default knex