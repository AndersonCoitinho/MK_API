exports.up = knex => knex.schema.createTable("products", table => {
  table.increments("id");
  table.integer("code").notNullable().unique();
  table.string("name", 255).notNullable();
  table.integer("stock").defaultTo(0).notNullable();
  table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("products");
