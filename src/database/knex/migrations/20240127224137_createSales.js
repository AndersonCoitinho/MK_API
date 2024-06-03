exports.up = knex => knex.schema.createTable("sales", table => {
    table.increments("id");
    table.integer("client_id").references("id").inTable("client");
    table.decimal("totalPrice", 10, 2);
    table.text("payment");
    table.timestamp("sale_date");
    table.text("observations");
    table.text("discount");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  
exports.down = knex => knex.schema.dropTable("sales");