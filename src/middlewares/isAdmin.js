const knex = require('../database/knex');
const AppError = require('../utils/AppError');

async function isAdmin(req, res, next) {
  const userId = req.user.id;

  try {
    const user = await knex('users').select('isAdmin').where({ id: userId }).first();

    if (!user || !user.isAdmin) {
      throw new AppError('Apenas administradores têm permissão para acessar este recurso', 403);
    }

    // Adicione isAdmin ao req.user para que possa ser usado nos controllers
    req.user.isAdmin = true; // Marca o usuário como administrador
    next();
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = { isAdmin };
