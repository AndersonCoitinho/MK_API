const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class SalesController {
    async create(request, response) {
        const { totalPrice, payment, products, quantity, price } = request.body;
        const { client_id } = request.body;

        // Verifica se o client_id é válido, por exemplo, se existe na tabela client
        const clientExists = await knex("client").where({ id: client_id }).first();
        if (!clientExists) {
            throw new AppError("Cliente não encontrado", 404);
        }

        // Verifica se todos os produtos têm a quantidade como um número inteiro
        const invalidProducts = products.filter(product => !Number.isInteger(product.quantity));
        if (invalidProducts.length > 0) {
            throw new AppError("A quantidade do produto deve ser um número inteiro", 400);
        }

        const [sales_id] = await knex("sales").insert({ totalPrice, payment, client_id });

        const itemSales = products.map((product) => {
            return {
                sales_id,
                product: product.product,
                quantity: product.quantity,
                price: product.price
            }
        })

        await knex("itemSales").insert(itemSales);

        return response.status(201).json()
    }

    async index(request, response) {
        const sales = await knex("sales")

        return response.json(sales);
    }
}

module.exports = SalesController;