const CONFIG_TEMPLATE = {
	client: 'pg',
	connection: {
		host: 'pg',
		database: 'db',
		user: 'dbadmin',
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

