var knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'localhost',
		database: 'db',
		user: 'postgres',
		password: 'dbadmin',
		port:'5432',
	}
});

export default knex