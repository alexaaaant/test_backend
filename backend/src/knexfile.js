const CONFIG_TEMPLATE = {
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		database: 'db',
		user: 'dbadmin',
		password: 'dbadmin',
		port:'5433',
	},
	migrations: {
		directory: './migrations',
	},
};

module.exports = {
	development: CONFIG_TEMPLATE,
	production: CONFIG_TEMPLATE
};
