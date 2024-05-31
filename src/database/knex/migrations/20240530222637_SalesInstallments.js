exports.up = knex => knex.schema.createTable("SalesInstallments", table => {
    table.increments("id");
    table.integer("sales_id").references("id").inTable("sales");
    table.string('payment_method').notNullable();
    table.integer('installment_number').notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.date('due_date').notNullable();
    table.string('status', 50).defaultTo('pendente');
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("SalesInstallments");