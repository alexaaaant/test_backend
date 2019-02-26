const CONFIG_TEMPLATE = {
	client: 'pg',
	connection: {
		host: 'localhost',
		database: 'db',
		user: 'postgres',
		password: 'dbadmin',
		port:'5432',
	},
	migrations: {
		directory: './migrations',
	},
};

module.exports = {
	development: CONFIG_TEMPLATE,
	production: CONFIG_TEMPLATE
};

