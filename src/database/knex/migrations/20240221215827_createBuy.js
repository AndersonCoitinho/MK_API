exports.up = knex => knex.schema.createTable("buy", table => {
  table.increments("id");
  table.string("invoice", 255).notNullable();
  table.string("order", 255).notNullable();
  table.decimal("totalPrice", 10, 2).notNullable();
  table.string("payment", 255).notNullable();
  table.datetime("buy_date").notNullable();
  table.text("observations").defaultTo('');
  table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("buy");
