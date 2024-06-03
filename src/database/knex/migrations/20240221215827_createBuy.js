exports.up = knex => knex.schema.createTable("buy", table => {
    table.increments("id");
    table.text("invoice");
    table.decimal("totalPrice", 10, 2);
    table.text("payment");
    table.timestamp("buy_date");
    table.text("observations");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  
  exports.down = knex => knex.schema.dropTable("buy");