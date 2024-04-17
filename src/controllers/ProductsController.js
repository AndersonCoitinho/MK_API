const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class ProductsController {
    async create (request, response) {
        const {code, name, description} = request.body
        const user_id = request.user.id;

        const checkCodeExists = await knex("products").where({code}).first()
        if(checkCodeExists) {
            throw new AppError("Este código já foi registrado")
        }

        await knex("products").insert({code, name, description, user_id});

        return response.status(201).json()
    }
    
    async update (request, response) {
        const {code, name, description} = request.body;
        const {id_products} = request.params;

        await knex("products").update({code, name, description, updated_at: knex.fn.now(), }).where({ id_products });

        return response.status(200).json()
    }
    
    async index (request, response) {
        // Aqui você precisará obter o ID do usuário logado
        const userId = request.user.id;
    
        // Em seguida, você pode usar o ID do usuário para filtrar os produtos
        const products = await knex("products").where({ user_id: userId });
    
        return response.json(products);
    }

    
    async show(request, response) {
        const { code } = request.params;
        const userId = request.user.id;
    
        // Aqui você pode garantir que apenas os produtos do usuário logado sejam retornados
        const product = await knex("products").where({ code, user_id: userId }).first();
    
        return response.json({ product });
    }
    
}

module.exports = ProductsController;