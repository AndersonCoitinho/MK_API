exports.up = knex => knex.schema.createTable("itemBuy", table => {
  table.increments("id");
  table.integer("buy_id").unsigned().notNullable().references("id").inTable("buy").onDelete("CASCADE").onUpdate("CASCADE");
  table.string("product", 255).notNullable();
  table.integer("quantity").defaultTo(1).notNullable();
  table.decimal("price", 10, 2).notNullable();
  table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("itemBuy");
