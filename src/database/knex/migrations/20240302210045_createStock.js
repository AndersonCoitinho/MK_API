exports.up = knex => knex.schema.createTable("stock", table => {
  table.increments("id");
  table.integer("products_id").unsigned().notNullable().references("id").inTable("products").onDelete("CASCADE").onUpdate("CASCADE");
  table.integer("quantity").defaultTo(0).notNullable();
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("stock");
