const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class FinancialController {
    async create(request, response) {
        const { sale_id, payment_method, amount, due_date, installment_number } = request.body;

        // Validate if sale_id exists
        const saleExists = await knex("sales").where({ id: sale_id }).first();
        if (!saleExists) {
            throw new AppError("Venda não encontrada", 404);
        }

        // Insert into financial_transactions table
        await knex("financial_transactions").insert({ sale_id, payment_method, amount, due_date, installment_number });

        return response.status(201).json();
    }

    async index(request, response) {
        const financialTransactions = await knex("financial_transactions").orderBy("due_date");

        return response.json(financialTransactions);
    }

    async getBalance(request, response) {
        const totalIncome = await knex("financial_transactions").sum("amount as total_income").where("amount", ">", 0).first();
        const totalExpense = await knex("financial_transactions").sum("amount as total_expense").where("amount", "<", 0).first();

        const balance = {
            total_income: totalIncome.total_income || 0,
            total_expense: totalExpense.total_expense || 0,
            balance: (totalIncome.total_income || 0) + (totalExpense.total_expense || 0)
        };

        return response.json(balance);
    }
}

module.exports = FinancialController;
