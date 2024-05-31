const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class CashFlowController {
    async index(request, response) {
        const financialTransactions = await knex("financial_transactions").orderBy("due_date");

        const cashFlow = financialTransactions.map(transaction => ({
            date: transaction.due_date,
            description: transaction.description,
            amount: transaction.amount,
            type: transaction.amount >= 0 ? "Receita" : "Despesa"
        }));

        return response.json(cashFlow);
    }
}

module.exports = CashFlowController;
