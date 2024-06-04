exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id");
  table.string("name", 255).notNullable();
  table.string("email", 255).notNullable().unique();
  table.string("password", 255).notNullable();
  table.string("avatar", 255).nullable();
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");
