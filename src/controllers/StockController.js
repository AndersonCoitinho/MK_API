const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class StockController {
    async create(request, response) {
        const { products_id, quantity } = request.body;

        // Verifica se o products_id é válido, por exemplo, se existe na tabela products
        const productExists = await knex("products").where({ id: products_id }).first();
        if (!productExists) {
            throw new AppError("Produto não encontrado", 404);
        }

        const productExistsInStock = await knex("stock").where({ products_id: products_id }).first();
        if (productExistsInStock) {
            throw new AppError("O Produto já tem estoque inicial, precisa fazer uma atualização de estoque", 404);
        }

        await knex("stock").insert({ products_id: products_id, quantity });

        return response.status(201).json()
    }

    async update(request, response) {
        const { quantity } = request.body;
        const { products_id } = request.params;

        const productInStock = await knex("stock").where({ products_id: products_id }).first();
        if (!productInStock) {
            throw new AppError("O Produto não tem estoque inicial para ser atualizado", 404);
        }

        // Obtém o valor atual do estoque e converte para número inteiro
        const currentQuantity = parseInt(productInStock.quantity);

        // Converte a nova quantidade para número inteiro
        const newQuantity = parseInt(quantity);

        // Verifica se as conversões foram bem-sucedidas
        if (isNaN(currentQuantity) || isNaN(newQuantity)) {
            throw new AppError("Valores de quantidade inválidos", 400);
        }

        // Calcula o novo valor da quantidade com base na operação
        const updatedQuantity = currentQuantity + newQuantity;

        // Atualiza a quantidade de estoque do produto
        await knex("stock")
            .where({ products_id })
            .update({ quantity: updatedQuantity.toString() });

        // Retorna uma resposta de sucesso
        return response.status(200).json();

    }

    async index (request, response) {
        const stock = await knex("stock")
    
        return response.json(stock);
    }

    async show (request, response) {
        const { products_id } = request.params;

        const stock = await knex("stock").where({ products_id }).first();
        
        return response.json(stock);
    }

}

module.exports = StockController;