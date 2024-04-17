exports.up = knex => knex.schema.createTable("itemBuy", table => {
    table.increments("id");
    table.integer("buy_id").references("id").inTable("buy");
    table.text("product");
    table.integer("quantity");
    table.text("price");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  
  exports.down = knex => knex.schema.dropTable("itemBuy");