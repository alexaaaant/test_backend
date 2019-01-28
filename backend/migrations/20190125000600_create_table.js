
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema
			.createTable('network', function(t) {
				t.increments('id').unsigned().primary();
				t.string('name').unique();
				t.string('ip').unique();
				t.integer('port').unique();
				t.string('route').unique();
			})
	]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('network')
  ])
};
