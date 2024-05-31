exports.up = knex => knex.schema.createTable("AccountsPayble", table => {
    table.increments("id");
    table.string('description', 255).notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.string('payment_method', 50).notNullable();
    table.date('due_date').notNullable();
    table.string('status', 50).defaultTo('pendente');
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("AccountsPayble");