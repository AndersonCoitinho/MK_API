const { Router } = require("express")

const ProductsController = require("../controllers/ProductsController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.use(ensureAuthenticated);

productsRoutes.post("/", productsController.create)
productsRoutes.post("/:id_products", productsController.update)
productsRoutes.get("/", productsController.index)
productsRoutes.get("/:code", productsController.show)

module.exports = productsRoutes;