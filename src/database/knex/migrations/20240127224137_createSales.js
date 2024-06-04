exports.up = knex => knex.schema.createTable("sales", table => {
  table.increments("id");
  table.integer("client_id").unsigned().notNullable().references("id").inTable("client").onDelete("CASCADE").onUpdate("CASCADE");
  table.decimal("totalPrice", 10, 2).notNullable();
  table.string("payment", 255).notNullable();
  table.datetime("sale_date").notNullable();
  table.text("observations").defaultTo('');
  table.decimal("discount", 10, 2).defaultTo(0.00);
  table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("sales");
