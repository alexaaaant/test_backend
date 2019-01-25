
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema
			.createTable('persons', function(t) {
				t.increments('id').unsigned().primary();
				t.timestamp('created_at').notNull().default(knex.fn.now());
				t.timestamp('updated_at').nullable();
				t.string('login').notNull().unique();
				t.string('password').notNull();
			})
	]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('persons')
  ])
};
