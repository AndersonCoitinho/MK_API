const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class TicketsController {
  async create(req, res) {
    const { title, description, type } = req.body;
    const id_user = req.user.id;

    if (!title || !description || !type) {
      return res.status(400).json({ error: "Preencha todos os campos!" });
    }

    try {
      const [id] = await knex('tickets').insert({
        title,
        description,
        type,
        user_id: id_user,
        status: 'Solicitado',
      });

      return res.status(201).json({ id });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar o chamado" });
    }
  }

  async updateStatus(req, res) {
    const { ticketId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'O campo status é obrigatório' });
    }

    try {
      if (!req.user.isAdmin) {
        throw new AppError('Apenas administradores têm permissão para atualizar o status dos tickets', 403);
      }

      await knex('tickets').where({ id: ticketId }).update({ status });

      return res.status(200).json({ message: 'Status do ticket atualizado com sucesso' });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async index(req, res) {
  try {
    const tickets = await knex('tickets')
      .join('users', 'tickets.user_id', 'users.id')
      .select('tickets.*', 'users.name as user_name');

    return res.json(tickets);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar os chamados" });
  }
}
};

module.exports = TicketsController;