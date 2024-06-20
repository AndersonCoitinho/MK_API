const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const BuyInstallmentsController = require("./BuyInstallmentsController");
const buyInstallmentsController = new BuyInstallmentsController

class BuyController {
    async create(request, response) {
        const { invoice, order, totalPrice, payment, buy_date, observations, products, installments } = request.body;
        const user_id = request.user.id;

        try {
            // Insere a compra principal e retorna o ID
            const [insertedPurchaseId] = await knex("buy").insert({ 
                invoice, order, totalPrice, payment, buy_date, observations, user_id 
            });

            const buy_id = insertedPurchaseId;

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

    async getTotalBuy(request, response) {
        const userId = request.user.id;

        const totalBuy = await knex("buy")
            .where({ user_id: userId })
            .sum("totalPrice as total");

        if (!totalBuy[0].total) {
            return response.status(200).json({ total: 0 });
        }

        return response.json({ total: totalBuy[0].total });
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

    async delete(request, response) {
        const { id } = request.params; 
        const userId = request.user.id;

        try {
            // Verifica se a venda existe
            const buy = await knex("buy").where({ id, user_id: userId }).first();
            if (!buy) {
                throw new AppError("Compra não encontrada ou não autorizada para deleção", 404);
            }

            // Deleta a compra principal
            await knex("buy").where({ id }).del();

            return response.status(200).json({ message: "Compra deletada com sucesso" });
        } catch (error) {
            console.error("Erro ao deletar compra:", error);
            return response.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}

module.exports = BuyController;
