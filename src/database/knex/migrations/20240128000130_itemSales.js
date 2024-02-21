exports.up = knex => knex.schema.createTable("itemsales", table => {
    table.increments("id");
    table.integer("sales_id").references("id").inTable("sales");
    table.text("product");
    table.integer("quantity");
    table.text("price");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  
  exports.down = knex => knex.schema.dropTable("itemsales");