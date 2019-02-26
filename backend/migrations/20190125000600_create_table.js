
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema
			.createTable('network', function(t) {
				t.increments('id').unsigned().primary();
				t.string('name');
				t.string('ip').unique();
				t.integer('port');
				t.integer('parent_id');
			})
	]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('network')
  ])
};
