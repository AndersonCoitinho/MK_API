const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class BuyController {
    async create(request, response) {
        const { totalPrice, payment, products } = request.body;
        const user_id = request.user.id;

        // Insere a compra principal e retorna o ID da compra
        const [insertedBuy_id] = await knex("buy").insert({ totalPrice, payment, user_id }).returning("id");

        const buy_id = insertedBuy_id.id || insertedBuy_id;

        // Mapeia os produtos para a estrutura correta, extraindo os valores de cada campo do objeto de produto
        const itemBuy = products.map((product) => ({
            buy_id,
            product: product.product,
            quantity: product.quantity,
            price: product.price,
            user_id
        }));

        // Insere os itens da compra no banco de dados
        await knex("itemBuy").insert(itemBuy);

        return response.status(201).json();
    }

    async index(request, response) {
        const userId = request.user.id;

        // Recupera todas as compras do usuário autenticado
        const buy = await knex("buy").where({ user_id: userId });

        return response.json(buy);
    }
}

module.exports = BuyController;
