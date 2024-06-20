const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',    // Substitua pelo host correto
  user: 'root',  // Substitua pelo usuário correto
  password: 'CetWise' // Substitua pela senha correta
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao MySQL!');
  connection.end();
});
