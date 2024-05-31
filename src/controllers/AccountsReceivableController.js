const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class AccountsReceivableController {
    async create(request, response) {
        const { description, amount, due_date, payment_method } = request.body;

        // Insert into accounts_receivable table
        await knex("accounts_receivable").insert({ description, amount, due_date, payment_method });

        return response.status(201).json();
    }

    async index(request, response) {
        const accountsReceivable = await knex("accounts_receivable").orderBy("due_date");

        return response.json(accountsReceivable);
    }
}

module.exports = AccountsReceivableController;
