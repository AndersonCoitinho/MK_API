exports.up = knex => knex.schema.createTable("products", table => {
    table.increments("id");
    table.integer("code");
    table.text("name");
    table.text("description");
    table.text("photo").null;
    table.integer("stock");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  
  exports.down = knex => knex.schema.dropTable("products");