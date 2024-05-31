const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const SalesInstallmentsController = require("../controllers/SalesInstallmentsController");
const salesInstallmentsController = new SalesInstallmentsController();

class SalesController {
    async create(request, response) {
        const { client_id, totalPrice, payment, sale_date, observations, discount, products, installments } = request.body;
        const user_id = request.user.id;

        try {
            // Verifica se o client_id é válido
            const clientExists = await knex("client").where({ id: client_id }).first();
            if (!clientExists) {
                throw new AppError("Cliente não encontrado", 404);
            }

            // Insere a venda principal
            const [sales_id] = await knex("sales").insert({ totalPrice, payment, sale_date, observations, discount, client_id, user_id });

            // Insere os itens da venda
            const itemSales = products.map((product) => ({
                sales_id,
                product: product.product,
                quantity: product.quantity,
                price: product.price
            }));
            await knex("itemSales").insert(itemSales);

            // Se houver parcelas a serem criadas
            if (installments && installments.length > 0) {
                for (const installment of installments) {
                    await salesInstallmentsController.create({
                        body: {
                            ...installment,
                            sale_id: sales_id // Passa o sales_id para cada parcela
                        }
                    }, response);
                }
            }

            return response.status(201).json({ sales_id });
        } catch (error) {
            console.error("Erro ao criar venda:", error);
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async index(request, response) {
        const userId = request.user.id;

        const sales = await knex("sales").where({ user_id: userId });

        return response.json(sales);
    }

    async getTotalSales(request, response) {
        const userId = request.user.id;

        const totalSales = await knex("sales")
            .where({ user_id: userId })
            .sum("totalPrice as total");

        if (!totalSales[0].total) {
            return response.status(200).json({ total: 0 });
        }

        return response.json({ total: totalSales[0].total });
    }
}

module.exports = SalesController;
