const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class SalesController {
    async create(request, response) {
        const { totalPrice, payment } = request.body;
        const { client_id } = request;

        // Verifica se o client_id é válido, por exemplo, se existe na tabela client
        const clientExists = await knex("client").where({ id: client_id }).first();
        if (!clientExists) {
            throw new AppError("Client not found", 404);
        }

        await knex("sales").insert({ totalPrice, payment, client_id });

        return response.status(201).json()
    }
}

module.exports = SalesController;