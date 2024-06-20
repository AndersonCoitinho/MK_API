exports.up = knex => knex.schema.createTable("BuyInstallments", table => {
    table.increments("id");
    table.integer("buy_id").unsigned().notNullable().references("id").inTable("buy").onDelete("CASCADE").onUpdate("CASCADE");
    table.text("description");
    table.string('payment_method').notNullable();
    table.integer('installment_number').notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table.date('due_date').notNullable();
    table.string('status', 50).defaultTo('pendente');
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("BuyInstallments");
