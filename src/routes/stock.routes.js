const { Router } = require("express")

const StockController = require("../controllers/StockController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")

const stockRoutes = Router();
const stockController = new StockController();

stockRoutes.use(ensureAuthenticated);

stockRoutes.post("/", stockController.create)
stockRoutes.put("/:products_id", stockController.update)
stockRoutes.get("/", stockController.index)

module.exports = stockRoutes;