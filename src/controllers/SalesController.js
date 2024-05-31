const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const SalesInstallmentsController = require("./SalesInstallmentsController");
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

            // Insere a venda principal e retorna o ID
            const [insertedSalesId] = await knex("sales").insert({ 
                totalPrice, payment, sale_date, observations, discount, client_id, user_id 
            }).returning("id");

            const sales_id = insertedSalesId.id || insertedSalesId; // Garante que sales_id seja um valor numérico

            //console.log("Sales ID:", sales_id); // Adiciona um log para verificar o sales_id

            // Insere os itens da venda
            const itemSales = products.map((product) => ({
                sales_id, // Aqui você associa cada item de venda à venda principal
                product: product.product,
                quantity: product.quantity,
                price: product.price,
                user_id
            }));

            //console.log("Item Sales:", itemSales); // Adiciona um log para verificar os itens de venda

            await knex("itemSales").insert(itemSales);

            // Se houver parcelas a serem criadas
            if (installments && installments.length > 0) {
                for (const installment of installments) {
                    try {
                        const installmentData = {
                            ...installment,
                            sales_id // Passa o sales_id corretamente
                        };
                        //console.log("Criando parcela com dados:", installmentData); // Log para verificar os dados da parcela
                        await salesInstallmentsController.create(installmentData, user_id);
                    } catch (error) {
                        console.error("Erro ao criar parcela:", error);
                    }
                }
            }

            return response.status(201).json({ sales_id });
        } catch (error) {
            //console.error("Erro ao criar venda:", error);
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
