const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class ProductsController {
    async create (request, response) {
        const {code, name} = request.body

        const checkCodeExists = await knex("products").where({code}).first()
        if(checkCodeExists) {
            throw new AppError("Este código já foi registrado")
        }

        await knex("products").insert({code, name});

        return response.status(201).json()
    }
    
    async update (request, response) {
        const {code, name} = request.body;
        const {id_products} = request.params;

        await knex("products").update({code, name, updated_at: knex.fn.now(), }).where({ id_products });

        return response.status(200).json()
    }

    async index (request, response) {
        const products = await knex("products")
    
        return response.json(products);
    }
    
    async show (request, response) {
        const { code } = request.params;

        const products = await knex("products").where({ code }).first()

        return response.json({products})
    }
}

module.exports = ProductsController;