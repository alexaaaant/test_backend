var knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'pg',
		database: 'db',
		user: 'dbadmin',
		password: 'dbadmin',
		port:'5432',
	}
});

export default knex