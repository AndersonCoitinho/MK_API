const { Router } = require("express")

const SalesController = require("../controllers/SalesController")
const ensureAuthenticated = require ("../middlewares/ensureAuthenticated")

const salesRoutes = Router();
const salesController = new SalesController();

salesRoutes.use(ensureAuthenticated);

salesRoutes.post("/", salesController.create)
salesRoutes.get("/", salesController.index)
salesRoutes.get('/total', salesController.getTotalSales);
salesRoutes.get('/clientSales/:id', salesController.getClientSales);

module.exports = salesRoutes;