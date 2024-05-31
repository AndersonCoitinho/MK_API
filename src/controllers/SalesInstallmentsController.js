const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class SalesInstallmentsController {
    async create(request, response) {
        const { sale_id, payment_method, amount, due_date, installment_number } = request.body;

        // Aqui você pode adicionar validações adicionais conforme necessário

        try {
            // Verifica se a venda associada existe
            const saleExists = await knex("sales").where({ id: sale_id }).first();
            if (!saleExists) {
                throw new AppError("Venda não encontrada", 404);
            }

            // Insere a parcela da venda
            const [installment_id] = await knex("salesInstallments").insert({
                sale_id,
                payment_method,
                amount,
                due_date,
                installment_number
            });

            return response.status(201).json({ installment_id });
        } catch (error) {
            console.error("Erro ao criar parcela da venda:", error);
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async index(request, response) {
        const { sale_id } = request.params;

        try {
            // Busca todas as parcelas de uma venda específica
            const installments = await knex("salesInstallments").where({ sale_id });

            return response.json(installments);
        } catch (error) {
            console.error("Erro ao buscar parcelas da venda:", error);
            return response.status(500).json({ error: "Erro ao buscar parcelas da venda. Por favor, tente novamente." });
        }
    }
}

module.exports = SalesInstallmentsController;
