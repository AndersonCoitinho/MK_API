exports.up = knex => knex.schema.createTable("client", table => {
    table.increments("id");
    table.text("name");
    table.text("address");
    table.text("city");
    table.text("birthday");
    table.text("instagram");
    table.text("telephone");
    table.text("comments");
    table.integer("id_user").references("users.id");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
  
  
  exports.down = knex => knex.schema.dropTable("client");