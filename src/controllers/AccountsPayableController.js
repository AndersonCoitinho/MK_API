const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class AccountsPayableController {
    async create(request, response) {
        const { description, amount, due_date, payment_method } = request.body;

        // Insert into accounts_payable table
        await knex("accounts_payable").insert({ description, amount, due_date, payment_method });

        return response.status(201).json();
    }

    async index(request, response) {
        const accountsPayable = await knex("accounts_payable").orderBy("due_date");

        return response.json(accountsPayable);
    }
}

module.exports = AccountsPayableController;
