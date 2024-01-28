const AppError = require("../utils/AppError");

const knex = require("../database/knex");

class ClientController {
    async create (request, response) {
        const {name, address, city, birthday, instagram, telephone, comments} = request.body
        const id_user = request.id_user;
        /*preciso conseguir pegar o id do user*/
        
        await knex("client").insert({name, address, city, birthday, instagram, telephone, comments, id_user});

        return response.status(201).json()
    }
    
    async index (request, response) {
        const client = await knex("client")
    
        return response.json(client);
    }
    

}

module.exports = ClientController;