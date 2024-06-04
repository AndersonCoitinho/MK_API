exports.up = knex => knex.schema.createTable("SalesInstallments", table => {
    table.increments("id");
    table.integer("sales_id").unsigned().notNullable().references("id").inTable("sales").onDelete("CASCADE").onUpdate("CASCADE");
    table.string("description", 255).notNullable();
    table.string("payment_method", 50).notNullable();
    table.integer("installment_number").notNullable();
    table.decimal("amount", 10, 2).notNullable();
    table.date("due_date").notNullable();
    table.string("status", 50).defaultTo("pendente").notNullable();
    table.integer("user_id").unsigned().notNullable().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
  
  exports.down = knex => knex.schema.dropTable("SalesInstallments");
  