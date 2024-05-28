const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class BuyController {
    async create(request, response) {
        const { totalPrice, payment, products } = request.body;
        const user_id = request.user.id;

        const [buy_id] = await knex("buy").insert({ totalPrice, payment, user_id });

        const itemBuy = products.map((product) => {
            return {
                buy_id,
                product: product,
                quantity: product.quantity,
                price: product.price
            }
        })

        await knex("itemBuy").insert(itemBuy);

        return response.status(201).json()
    }

    async index(request, response) {
        const userId = request.user.id;

        const buy = await knex("buy").where({ user_id: userId });

        return response.json(buy);
    }
}

module.exports = BuyController;