const knex = require("../database/knex");

class BuyInstallmentsController {
    async create(installmentData, user_id) {
        try {
            await knex("buyInstallments").insert({
                ...installmentData,
                user_id,
                created_at: knex.fn.now(),
                updated_at: knex.fn.now()
            });
        } catch (error) {
            throw new Error(`Erro ao criar parcela: ${error.message}`);
        }
    }

    async index(request, response) {
        const { buy_id } = request.params;
        const user_id = request.user.id;

        try {
            if (!buy_id) {
                throw new Error("Parâmetro buy_id não fornecido");
            }

            const buy = await knex("buy")
                .where({ id: buy_id, user_id })
                .first();

            if (!buy) {
                throw new Error("Buy ID não encontrado para este usuário");
            }

            const buyInstallments = await knex("buyInstallments")
                .where({ buy_id });

            return response.json({ buyInstallments });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }

    async accountsReceivable(request, response) {
        const user_id = request.user.id;

        try {
            const receivables = await knex("BuyInstallments as bi")
            .join("buy as b1", "bi.buy_id", "=", "b1.id") // Primeiro join com alias b1
            .where("b1.user_id", user_id)
            .andWhere("bi.status", "pendente")
            .select(
                "bi.id",
                "bi.buy_id",
                "b1.invoice as invoice", // Selecionar o campo invoice da tabela buy com alias b1
                "b1.order as order",
                "bi.payment_method",
                "bi.amount",
                "bi.due_date",
                "bi.status",    
                "bi.description"
            );

            return response.json({ receivables });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }

    async update(request, response) {
        const { id } = request.params;
        const { due_date, status } = request.body;

        try {
            const updatedInstallment = await knex("BuyInstallments")
                .where({ id })
                .update({ due_date, status, updated_at: knex.fn.now() });

            return response.json({ message: "Parcela atualizada com sucesso" });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

module.exports = BuyInstallmentsController; // Exportar a instância do controller
