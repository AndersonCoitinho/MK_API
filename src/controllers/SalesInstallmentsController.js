const knex = require("../database/knex");

class SalesInstallmentsController {
    async create(installment, user_id) {
        const { sales_id, payment_method, amount, due_date, installment_number } = installment;

        if (!sales_id || !payment_method || !amount || !due_date || !installment_number) {
            throw new Error("Dados da parcela incompletos");
        }

        try {
            const newInstallment = {
                sales_id,
                payment_method,
                amount,
                due_date,
                user_id,
                installment_number
            };

            await knex("salesInstallments").insert(newInstallment);

            return newInstallment;
        } catch (error) {
            throw error;
        }
    }

    async index(request, response) {
        const { sales_id } = request.params;
        const user_id = request.user.id;

        try {
            if (!sales_id) {
                throw new Error("Parâmetro sales_id não fornecido");
            }

            // Verifica se o sales_id pertence ao user_id
            const sales = await knex("sales")
                .where({ id: sales_id, user_id })
                .first();

            if (!sales) {
                throw new Error("Sales ID não encontrado para este usuário");
            }

            const salesInstallments = await knex("salesInstallments")
                .where({ sales_id });

            return response.json({ salesInstallments });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }

    async accountsReceivable(request, response) {
        const user_id = request.user.id; // Obtém o user_id do usuário autenticado

        try {
            // Consulta todas as parcelas pendentes do usuário, incluindo dados do cliente
            const receivables = await knex("salesInstallments")
                .join("sales", "salesInstallments.sales_id", "=", "sales.id")
                .join("client", "sales.client_id", "=", "client.id")
                .where("sales.user_id", user_id)
                .andWhere("salesInstallments.status", "pendente")
                .select(
                    "salesInstallments.id",
                    "salesInstallments.sales_id",
                    "client.id as client_id",
                    "client.name as client_name",
                    "salesInstallments.payment_method",
                    "salesInstallments.amount",
                    "salesInstallments.due_date",
                    "salesInstallments.status"
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
            const updatedInstallment = await knex("salesInstallments")
                .where({ id })
                .update({ due_date, status, updated_at: knex.fn.now() });

            return response.json({ message: "Parcela atualizada com sucesso" });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }

    async clientInstallments(request, response) {
        const { client_id } = request.params;
        const user_id = request.user.id;

        try {
            // Verifica se o cliente pertence ao usuário autenticado
            const client = await knex("client")
                .where({ id: client_id, id_user: user_id })
                .first();

            if (!client) {
                throw new Error("Cliente não encontrado para este usuário");
            }

            // Busca as parcelas relacionadas às vendas do cliente
            const installments = await knex("salesInstallments")
                .join("sales", "salesInstallments.sales_id", "=", "sales.id")
                .where("sales.client_id", client_id)
                .andWhere("sales.user_id", user_id)
                .select(
                    "salesInstallments.id",
                    "salesInstallments.sales_id",
                    "salesInstallments.payment_method",
                    "salesInstallments.amount",
                    "salesInstallments.due_date",
                    "salesInstallments.status"
                );

            return response.json({ installments });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }


}

module.exports = SalesInstallmentsController;
