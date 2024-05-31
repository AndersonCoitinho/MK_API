exports.up = knex => knex.schema.createTable("CashFlow", table => {
    table.increments("id");
    table.string('description', 255).notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.string('type', 50).notNullable();
    table.date('date').notNullable();
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("CashFlow");