
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema
			.createTable('network', function(t) {
				t.string('name');
				t.string('ip');
				t.increments('port');
				t.string('route').unique();
			})
	]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('network')
  ])
};
