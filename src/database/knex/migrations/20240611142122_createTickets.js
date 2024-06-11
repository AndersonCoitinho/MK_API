exports.up = knex => knex.schema.createTable("tickets", table => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.enu('type', ['correcao', 'melhoria']).notNullable();
    table.enu('status', ['Solicitado', 'Em desenvolvimento', 'Concluído']).defaultTo('Solicitado');
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("tickets");