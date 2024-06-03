const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const BuyInstallmentsController = require("./BuyInstallmentsController");
const buyInstallmentsController = new BuyInstallmentsController

class BuyController {
    async create(request, response) {
        const { invoice, totalPrice, payment, buy_date, observations, products, installments } = request.body;
        const user_id = request.user.id;

        try {
            // Insere a compra principal e retorna o ID
            const [insertedPurchaseId] = await knex("buy").insert({ 
                invoice, totalPrice, payment, buy_date, observations, user_id 
            }).returning("id");

            const buy_id = insertedPurchaseId.id || insertedPurchaseId; 

            // Insere os itens da compra
            const itemBuys = products.map((product) => ({
                buy_id, 
                product: product.product,
                quantity: product.quantity,
                price: product.price,
                user_id
            }));

            await knex("itemBuy").insert(itemBuys);

            // Se houver parcelas a serem criadas
            if (installments && installments.length > 0) {
                for (const installment of installments) {
                    try {
                        const installmentData = {
                            ...installment,
                            buy_id
                        };
                        //console.log("Criando parcela com dados:", installmentData);
                        await buyInstallmentsController.create(installmentData, user_id);
                    } catch (error) {
                        console.error("Erro ao criar parcela:", error);
                    }
                }
            }

            return response.status(201).json({ buy_id });
        } catch (error) {
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async index(request, response) {
        const userId = request.user.id;

        try {
            const buys = await knex("buy").where({ user_id: userId });

            return response.json(buys);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}

module.exports = BuyController;
