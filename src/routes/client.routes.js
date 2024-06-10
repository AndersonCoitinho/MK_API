const { Router } = require("express")

const ClientController = require("../controllers/ClientController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")

const clientRoutes = Router();
const clientController = new ClientController();

clientRoutes.use(ensureAuthenticated);

clientRoutes.post("/", clientController.create)
clientRoutes.put("/:id", clientController.update)
clientRoutes.get("/", clientController.index)

module.exports = clientRoutes;