exports.up = knex => knex.schema.createTable("AccountsPaybleInstallments", table => {
    table.increments("id");
    table.integer('account_payable_id').notNullable().references('id').inTable('AccountsPayable');
    table.integer('installment_number').notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.date('due_date').notNullable();
    table.string('status', 50).defaultTo('pendente');
});


exports.down = knex => knex.schema.dropTable("AccountsPaybleInstallments");