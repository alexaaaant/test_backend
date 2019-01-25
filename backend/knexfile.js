const CONFIG_TEMPLATE = {
	client: 'pg',
	connection: {
		host : 'pg',
		user : 'dbadmin',
		password : 'dbadmin',
		database : 'db',
		port: '5432'
	},
	migrations: {
		directory: './migrations',
	},
};

module.exports = {
	development: CONFIG_TEMPLATE,
	production: CONFIG_TEMPLATE
};
