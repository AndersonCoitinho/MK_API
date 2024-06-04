exports.up = knex => knex.schema.createTable("client", table => {
  table.increments("id");
  table.string("name", 255).notNullable();
  table.string("address", 255);
  table.string("city", 255);
  table.date("birthday");
  table.string("instagram", 80);
  table.string("telephone", 20);
  table.text("comments").defaultTo('');
  table.integer("id_user").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("client");