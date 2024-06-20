const path = require("path")

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',      // Host do banco de dados
      user: 'root',    // Usuário do banco de dados
      password: 'CetWise',  // Senha do banco de dados
      database: 'mk' // Nome do banco de dados
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations"),
    },
  }
};

/*
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations"),
    },
    useNullAsDefault: true
  }
};
*/