exports.up = knex => knex.schema.createTable("client", table => {
  table.increments("id");
  table.string("name", 255).notNullable();
  table.string("address", 255).nullable();
  table.string("city", 255).nullable();
  table.date("birthday").nullable();
  table.string("instagram", 80).nullable();
  table.string("telephone", 20).nullable();
  table.text("comments").defaultTo('').nullable();
  table.integer("id_user").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("client");