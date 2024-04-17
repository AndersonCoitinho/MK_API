exports.up = knex => knex.schema.createTable("buy", table => {
    table.increments("id");
    table.text("totalPrice");
    table.text("payment");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  
  exports.down = knex => knex.schema.dropTable("buy");