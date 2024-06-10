const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class ClientController {
    async create(request, response) {
        const { name, address, city, birthday, instagram, telephone, comments } = request.body
        const id_user = request.user.id;


        await knex("client").insert({ name, address, city, birthday, instagram, telephone, comments, id_user });

        return response.status(201).json()
    }

    async index(request, response) {
        const userId = request.user.id;

        const client = await knex("client").where({ id_user: userId });

        return response.json(client);
    }

    async update(request, response) {
        const userId = request.user.id;
        const { id } = request.params;
        const { name, address, city, birthday, instagram, telephone, comments } = request.body;

        try {
            // Verifica se o cliente existe e pertence ao usuário
            const client = await knex("client").where({ id, id_user: userId }).first();
            if (!client) {
                throw new AppError("Cliente não encontrado ou não pertence ao usuário.", 404);
            }
            
            // Atualiza os dados do cliente
            await knex("client")
                .where({ id })
                .update({ name, address, city, birthday, instagram, telephone, comments });

            return response.status(200).json({ message: "Cliente atualizado com sucesso." });
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            return response.status(error.statusCode || 500).json({ message: error.message });
        }
    }   
}

module.exports = ClientController;